using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
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
        private readonly BlobServiceClient _blobServiceClient;
        private readonly ICandidateService _candidateService;

        private readonly string storageAccount;
        private readonly string containerName;

        public ImageService(
            IConfiguration configuration, 
            BlobServiceClient blobServiceClient,
            ICandidateService candidateService)
        {
            _blobServiceClient = blobServiceClient;
            _candidateService = candidateService;

            storageAccount = configuration["Storage:ServiceUri"];
            containerName = configuration["Storage:ContainerName"];
        }

        public async Task<string> SaveImage(int candidateId, IFormFile file)
        {
            var newFileName = await GetFileName(candidateId, file);
            await SaveInBlob(newFileName.FileName, file);
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


        private async Task<CandidateFile> GetFileName(int candidateId, IFormFile file)
        {
            var candidate = await _candidateService.GetCandidatesById(candidateId);

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

        private async Task SaveInBlob(string newFileName, IFormFile file)
        {
            try
            {
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);

                using var memoryFile = new MemoryStream();
                file.CopyTo(memoryFile);
                memoryFile.Position = 0;
                await containerClient.UploadBlobAsync(newFileName, memoryFile);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
