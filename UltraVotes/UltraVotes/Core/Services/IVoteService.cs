using UltraVotes.Core.DTOs;

namespace UltraVotes.Core.Services
{
    public interface IVoteService
    {
        Task Save(VoteDto voteDto);
    }
}
