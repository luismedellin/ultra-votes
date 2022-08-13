using UltraVotes.Core.ViewModels;
using UltraVotes.Data.Models;

namespace UltraVotes.Core.Services
{
    public interface IUserService
    {
        Task<List<UserVM>> GetAll(int masterVoteId);
    }
}