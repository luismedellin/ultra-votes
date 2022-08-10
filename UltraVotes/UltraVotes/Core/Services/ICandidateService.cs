using UltraVotes.Core.ViewModels;

namespace UltraVotes.Core.Services
{
    public interface ICandidateService
    {
        Task<List<CandidateVM>> GetByVoteId(int voteId, string userId);
    }
}