using UltraVotes.Core.ViewModels;
using UltraVotes.Data;
using UltraVotes.Data.Models;

namespace UltraVotes.Core.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public Task<List<UserVM>> GetAll(int masterVoteId)
        {
            return unitOfWork.Users.GetAll(masterVoteId);
        }
    }
}
