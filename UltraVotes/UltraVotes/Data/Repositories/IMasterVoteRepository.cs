using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public interface IMasterVoteRepository
    {
        Task<List<MasterVoteModel>> GetAllVotes();
    }
}
