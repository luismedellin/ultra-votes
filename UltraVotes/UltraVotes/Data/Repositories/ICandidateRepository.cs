﻿using UltraVotes.Core.ViewModels;

namespace UltraVotes.Data.Repositories
{
    public interface ICandidateRepository
    {
        Task<List<CandidateVM>> GetByVoteId(int voteId, string userId);
    }
}