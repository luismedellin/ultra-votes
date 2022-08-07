using UltraVotes.Data.Repositories;

namespace UltraVotes.Data
{
    public class UnitOfWork: IUnitOfWork
    {
        public UnitOfWork(
            IMasterDataRepository dataMaster,
            IMasterVoteRepository masterVoteRepository,
            IUserRepository userRepository,
            IVoteRepository voteRepository)
        {
            DataMaster = dataMaster;
            MasterVotes = masterVoteRepository;
            Users = userRepository;
            Votes = voteRepository;
        }

        public IMasterDataRepository DataMaster { get; }
        public IMasterVoteRepository MasterVotes { get; }
        public IUserRepository Users { get; }
        public IVoteRepository Votes { get; }
    }
}
