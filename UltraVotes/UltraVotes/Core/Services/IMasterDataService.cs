using UltraVotes.Core.ViewModels;

namespace UltraVotes.Core.Services
{
    public interface IMasterDataService
    {
        Task<MasterDataVM> GetMasterData();
    }
}
