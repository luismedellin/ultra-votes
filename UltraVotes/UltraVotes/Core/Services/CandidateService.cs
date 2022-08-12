using AutoMapper;
using FluentValidation;
using UltraVotes.Core.DTOs;
using UltraVotes.Core.ViewModels;
using UltraVotes.Data;
using UltraVotes.Data.Models;

namespace UltraVotes.Core.Services
{
    public class CandidateService : ICandidateService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IValidator<CandidateDto> candidateValidator;
        public readonly IMapper mapper;

        public CandidateService(IUnitOfWork unitOfWork,
            IValidator<CandidateDto> masterVoteValidator,
            IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.candidateValidator = masterVoteValidator;
            this.mapper = mapper;
        }

        public Task<List<CandidateVM>> GetFinalCandidates(int masterVoteId)
        {
            return unitOfWork.Candidates.GetFinalCandidates(masterVoteId);
        }

        public Task<List<CandidateVM>> GetByVoteId(int voteId, string userId)
        {
            return unitOfWork.Candidates.GetByVoteId(voteId, userId);
        }

        public async Task<CandidateVM> Save(CandidateDto candidateDto)
        {
            var validation = await candidateValidator.ValidateAsync(candidateDto);

            if (!validation.IsValid)
            {
                var data = validation.Errors?.Select(e => new
                {
                    Code = e.ErrorCode,
                    PropertyName = e.PropertyName,
                    Message = e.ErrorMessage
                }).ToList();

                throw new Exception($"Errors {data}");
            }

            //validate don't repeated candidate.

            var candidate = mapper.Map<CandidateModel>(candidateDto);

            await unitOfWork.Candidates.Save(candidate);

            return mapper.Map<CandidateVM>(candidate);
        }

        public Task Delete(int candidateId)
        {
            return unitOfWork.Candidates.Delete(candidateId);
        }
    }
}
