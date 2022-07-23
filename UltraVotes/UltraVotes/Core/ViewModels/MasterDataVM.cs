using UltraVotes.Data.Models;

namespace UltraVotes.Core.ViewModels
{
    public class MasterDataVM
    {
        public List<StatusModel> Status { get; set; }
        public List<MasterVoteCategoryModel> Categories { get; set; }
    }
}
