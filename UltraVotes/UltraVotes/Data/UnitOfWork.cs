using UltraVotes.Data.Repositories;

namespace UltraVotes.Data
{
    public class UnitOfWork: IUnitOfWork
    {
        public UnitOfWork(IUserRepository userRepository)
        {
            Users = userRepository;
        }

        public IUserRepository Users { get; }
    }
}
