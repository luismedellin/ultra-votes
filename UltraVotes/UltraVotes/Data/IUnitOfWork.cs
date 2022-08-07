using UltraVotes.Data.Repositories;

namespace UltraVotes.Data
{
    public interface IUnitOfWork
    {
        IMasterDataRepository DataMaster { get; }
        IMasterVoteRepository MasterVotes { get; }
        IUserRepository Users { get; }
        IVoteRepository Votes { get; }
    }
}
