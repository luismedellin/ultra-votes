using UltraVotes.Core.ViewModels;
using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public interface ICandidateRepository
    {
        Task<List<CandidateVM>> GetFinalCandidates(int masterVoteId);
        Task<CandidateVM> GetCandidatesById(int candidateId);
        Task<List<CandidateVM>> GetByVoteId(int voteId, string userId);
        Task Save(CandidateModel candidate);
        Task Update(CandidateModel candidate);
        Task Delete(int candidateId);
    }
}
