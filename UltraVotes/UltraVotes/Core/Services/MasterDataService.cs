using UltraVotes.Core.ViewModels;
using UltraVotes.Data;

namespace UltraVotes.Core.Services
{
    public class MasterDataService : IMasterDataService
    {
        private readonly IUnitOfWork unitOfWork;

        public MasterDataService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<MasterDataVM> GetMasterData()
        {
            var status = await unitOfWork.DataMaster.GetStatus();
            var categories = await unitOfWork.DataMaster.GetCategories();

            return new MasterDataVM()
            {
                Status = status,
                Categories = categories,
            };
        }
    }
}
