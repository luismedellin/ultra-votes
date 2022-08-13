using UltraVotes.Core.ViewModels;
using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public interface IUserRepository
    {
        Task<List<UserVM>> GetAll(int masterVoteId);
    }
}
