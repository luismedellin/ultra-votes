using UltraVotes.Data.Models;

namespace UltraVotes.Core.ViewModels
{
    public class MasterDataVM
    {
        public List<MasterVoteCategoryModel> Categories { get; set; }
        public List<MasterVoteRestrictionModel> Restrictions { get; set; }
        public List<StatusModel> Status { get; set; }
    }
}
