using UltraVotes.Data.Repositories;

namespace UltraVotes.Data
{
    public class UnitOfWork: IUnitOfWork
    {
        public UnitOfWork(
            ICandidateRepository candidateRepository,
            IMasterDataRepository dataMasterRepository,
            IMasterVoteRepository masterVoteRepository,
            IUserRepository userRepository,
            IVoteRepository voteRepository)
        {
            Candidates = candidateRepository;
            DataMaster = dataMasterRepository;
            MasterVotes = masterVoteRepository;
            Users = userRepository;
            Votes = voteRepository;
        }

        public ICandidateRepository Candidates { get; }
        public IMasterDataRepository DataMaster { get; }
        public IMasterVoteRepository MasterVotes { get; }
        public IUserRepository Users { get; }
        public IVoteRepository Votes { get; }
    }
}
