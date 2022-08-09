using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public interface ICandidateRepository
    {
        Task<List<CandidateModel>> GetByVoteId(int voteId);
    }
}
