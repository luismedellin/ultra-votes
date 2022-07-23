using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public interface IMasterDataRepository
    {
        Task<List<StatusModel>> GetStatus();
        Task<List<MasterVoteCategoryModel>> GetCategories();
    }
}
