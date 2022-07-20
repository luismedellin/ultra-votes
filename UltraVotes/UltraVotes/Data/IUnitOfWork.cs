using UltraVotes.Data.Repositories;

namespace UltraVotes.Data
{
    public interface IUnitOfWork
    {
        IUserRepository Users { get; }
    }
}
