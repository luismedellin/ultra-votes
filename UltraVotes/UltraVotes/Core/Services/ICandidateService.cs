using UltraVotes.Core.ViewModels;

namespace UltraVotes.Core.Services
{
    public interface ICandidateService
    {
        Task<List<CandidateVM>> GetFinalCandidates(int masterVoteId);
        Task<List<CandidateVM>> GetByVoteId(int voteId, string userId);
        Task Delete(int candidateId);
    }
}