using UltraVotes.Core.DTOs;

namespace UltraVotes.Data.Repositories
{
    public interface IVoteRepository
    {
        Task Save(VoteDto voteDto);
    }
}