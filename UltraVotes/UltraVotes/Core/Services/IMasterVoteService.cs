using UltraVotes.Core.DTOs;
using UltraVotes.Core.ViewModels;
using UltraVotes.Data.Models;

namespace UltraVotes.Core.Services
{
    public interface IMasterVoteService
    {
        Task<List<MasterVoteVM>> GetAllVotes();
        Task SaveMasterVote(MasterVoteDto masterVoteDto);
    }
}
