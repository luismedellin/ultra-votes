using UltraVotes.Core.DTOs;
using UltraVotes.Core.ViewModels;
using UltraVotes.Data.Models;

namespace UltraVotes.Core.Services
{
    public interface ICandidateService
    {
        Task<List<CandidateVM>> GetFinalCandidates(int masterVoteId);
        Task<List<CandidateVM>> GetByVoteId(int voteId, string userId);
        Task<CandidateVM> Save(CandidateDto candidateDto);
        Task Delete(int candidateId);
    }
}