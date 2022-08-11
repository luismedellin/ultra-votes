using UltraVotes.Data.Repositories;

namespace UltraVotes.Data
{
    public interface IUnitOfWork
    {
        ICandidateRepository Candidates { get; }
        IMasterDataRepository DataMaster { get; }
        IMasterVoteRepository MasterVotes { get; }
        IUserRepository Users { get; }
        IVoteRepository Votes { get; }
    }
}
