using UltraVotes.Core.ViewModels;
using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public interface IMasterVoteRepository
    {
        Task<List<MasterVoteVM>> GetAllVotes();
        Task Save(MasterVoteModel masterVote);
    }
}
