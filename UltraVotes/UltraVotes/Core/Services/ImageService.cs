using AutoMapper;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using UltraVotes.Core.DTOs;
using UltraVotes.Core.ViewModels;

namespace UltraVotes.Core.Services
{
    public struct CandidateFile
    {
        public string Path { get; }
        public string FileName { get; }

        public CandidateFile(string storageAccount, string containerName, string fileName)
        {
            Path = $"{storageAccount}/{containerName}/{fileName}";
            FileName = fileName;
        }
    }

    public class ImageService : IImageService
    {
        private readonly IMapper mapper;
        private readonly BlobServiceClient _blobServiceClient;
        private readonly ICandidateService _candidateService;

        private readonly string storageAccount;
        private readonly string containerName;

        public ImageService(
            IConfiguration configuration,
            IMapper mapper,
            BlobServiceClient blobServiceClient,
            ICandidateService candidateService)
        {
            this.mapper = mapper;
            _blobServiceClient = blobServiceClient;
            _candidateService = candidateService;

            storageAccount = configuration["Storage:ServiceUri"];
            containerName = configuration["Storage:ContainerName"];
        }

        public async Task<string> SaveImage(int candidateId, IFormFile file)
        {
            var candidate = await _candidateService.GetCandidatesById(candidateId);
            if (candidate is null) throw new Exception("Invalid candidate");

            var newFileName = await GetFileName(candidate, file);
            await SaveInBlob(newFileName, file);
            await UpdateCandidateAvatar(candidate, newFileName);

            return newFileName.Path;
        }

        public async Task<string> GetImage()
        {
            try
            {
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);

                var results = new List<string>();
                await foreach (BlobItem blob in containerClient.GetBlobsAsync())
                {
                    results.Add(blob.Name);
                }


                return "hola";
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        private async Task<CandidateFile> GetFileName(CandidateVM candidate, IFormFile file)
        {
            var path = $"votacion-{candidate.MasterVoteId}/";
            var fileExists = await FileExists(candidate, file.FileName);

            var fileName = fileExists
                ? $"{path}{Guid.NewGuid()}{Path.GetExtension(file.FileName)}"
                : $"{path}{file.FileName}";

            return new CandidateFile(storageAccount, containerName, fileName);
        }

        private async Task<bool> FileExists(CandidateVM candidate, string fileName)
        {
            var candidates = await _candidateService.GetFinalCandidates(candidate.MasterVoteId);
            return candidates.Any(c => c.Avatar.EndsWith(fileName) && c.UserId != candidate.UserId);
        }

        private async Task SaveInBlob(CandidateFile candidateFile, IFormFile file)
        {
            try
            {
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
                var blob = containerClient.GetBlobClient(candidateFile.FileName);

                await using var memoryFile = new MemoryStream();
                await file.CopyToAsync(memoryFile);
                memoryFile.Position = 0;
                await blob.UploadAsync(memoryFile, true);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        private async Task UpdateCandidateAvatar(CandidateVM candidate, CandidateFile newFileName)
        {
            candidate.Avatar = newFileName.Path;
            var candidateDto = mapper.Map<CandidateDto>(candidate);
            await _candidateService.Update(candidateDto);
        }
    }
}
