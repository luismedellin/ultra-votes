using UltraVotes.Data.Models;

namespace UltraVotes.Core.Services
{
    public interface ICandidateService
    {
        Task<List<CandidateModel>> GetByVoteId(int voteId);
    }
}