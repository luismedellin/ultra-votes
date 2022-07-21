using UltraVotes.Data.Models;

namespace UltraVotes.Core.Services
{
    public interface IMasterVoteService
    {
        Task<List<MasterVoteModel>> GetAllVotes();
    }
}
