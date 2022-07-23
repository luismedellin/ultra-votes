using UltraVotes.Data.Repositories;

namespace UltraVotes.Data
{
    public class UnitOfWork: IUnitOfWork
    {
        public UnitOfWork(
            IMasterDataRepository dataMaster,
            IMasterVoteRepository masterVoteRepository,
            IUserRepository userRepository)
        {
            DataMaster = dataMaster;
            MasterVotes = masterVoteRepository;
            Users = userRepository;
        }

        public IMasterDataRepository DataMaster { get; }
        public IMasterVoteRepository MasterVotes { get; }
        public IUserRepository Users { get; }
    }
}
