namespace UltraVotes.Data.Models
{
    public class MasterVoteRestrictionModel
    {
        public int RestrictionId { get; set; }
        public string Description { get; set; }
        public int Value => RestrictionId;
        public string Label => Description;
    }
}
