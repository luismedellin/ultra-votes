using UltraVotes.Data;
using UltraVotes.Data.Models;

namespace UltraVotes.Core.Services
{
    public class CandidateService : ICandidateService
    {
        private readonly IUnitOfWork unitOfWork;

        public CandidateService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public Task<List<UserModel>> GetAll()
        {
            return unitOfWork.Users.GetAll();
        }

        public Task<List<CandidateModel>> GetByVoteId(int voteId)
        {
            return unitOfWork.Candidates.GetByVoteId(voteId);
        }
    }
}
