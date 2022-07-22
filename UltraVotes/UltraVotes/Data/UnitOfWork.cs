using UltraVotes.Data.Repositories;

namespace UltraVotes.Data
{
    public class UnitOfWork: IUnitOfWork
    {
        public UnitOfWork(
            IMasterVoteRepository masterVoteRepository,
            IUserRepository userRepository)
        {
            MasterVotes = masterVoteRepository;
            Users = userRepository;
        }

        public IMasterVoteRepository MasterVotes { get; }
        public IUserRepository Users { get; }
    }
}
