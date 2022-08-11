using UltraVotes.Core.DTOs;
using UltraVotes.Core.ViewModels;

namespace UltraVotes.Core.Services
{
    public interface IMasterVoteService
    {
        Task<List<MasterVoteVM>> GetAllVotes();
        Task<MasterVoteVM> GetVoteById(int masterVoteId);
        Task<List<MasterVoteVM>> GetVotesByUser(string userId);
        Task<MasterVoteVM> SaveMasterVote(MasterVoteDto masterVoteDto);
        Task Update(MasterVoteDto masterVoteDto);
    }
}
