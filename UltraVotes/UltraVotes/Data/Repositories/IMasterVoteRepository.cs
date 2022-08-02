using UltraVotes.Core.ViewModels;
using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public interface IMasterVoteRepository
    {
        Task<List<MasterVoteVM>> GetAllVotes();
        Task<MasterVoteVM> GetVoteById(int masterVoteId);
        Task Save(MasterVoteModel masterVote);
        Task Update(MasterVoteModel masterVote);
    }
}
