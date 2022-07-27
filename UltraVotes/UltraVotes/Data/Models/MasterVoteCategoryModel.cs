namespace UltraVotes.Data.Models
{
    public class MasterVoteCategoryModel
    {
        public int MasterVoteCategoryId { get; set; }
        public string Description { get; set; }
        public int Value => MasterVoteCategoryId;
        public string Label => Description;
    }
}
