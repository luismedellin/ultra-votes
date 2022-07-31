using AutoMapper;
using FluentValidation;
using UltraVotes.Core.DTOs;
using UltraVotes.Core.ViewModels;
using UltraVotes.Data;
using UltraVotes.Data.Models;

namespace UltraVotes.Core.Services
{
    public class MasterVoteService : IMasterVoteService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IValidator<MasterVoteDto> masterVoteValidator;
        public readonly IMapper mapper;

        public MasterVoteService(IUnitOfWork unitOfWork,
            IValidator<MasterVoteDto> masterVoteValidator,
            IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.masterVoteValidator = masterVoteValidator;
            this.mapper = mapper;
        }

        public Task<List<MasterVoteVM>> GetAllVotes()
        {
            return unitOfWork.MasterVotes.GetAllVotes();   
        }

        public Task<MasterVoteVM> GetVoteById(int masterVoteId)
        {
            return unitOfWork.MasterVotes.GetVoteById(masterVoteId);
        }

        public async Task<MasterVoteVM> SaveMasterVote(MasterVoteDto masterVoteDto)
        {
            var validation = await masterVoteValidator.ValidateAsync(masterVoteDto);
            if (!validation.IsValid)
            {
                var data =  validation.Errors?.Select(e => new 
                {
                    Code = e.ErrorCode,
                    PropertyName = e.PropertyName,
                    Message = e.ErrorMessage
                }).ToList();

                throw new Exception("Errors");
            }

            var masterVoteModel = mapper.Map<MasterVoteModel>(masterVoteDto);

            await unitOfWork.MasterVotes.Save(masterVoteModel);

            return await unitOfWork.MasterVotes.GetVoteById(masterVoteModel.MasterVoteId);
        }

        public async Task Update(MasterVoteDto masterVoteDto)
        {
            var validation = await masterVoteValidator.ValidateAsync(masterVoteDto);
            if (!validation.IsValid)
            {
                var data = validation.Errors?.Select(e => new
                {
                    Code = e.ErrorCode,
                    PropertyName = e.PropertyName,
                    Message = e.ErrorMessage
                }).ToList();

                throw new Exception("Errors");
            }

            var masterVoteModel = mapper.Map<MasterVoteModel>(masterVoteDto);

            await unitOfWork.MasterVotes.Update(masterVoteModel);
        }
    }
}
