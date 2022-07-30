namespace UltraVotes.Data.Models
{
    public class MasterVoteModel
    {
        public int MasterVoteId { get; set; }
        public int MasterVoteCategoryId { get; set; }
        public int MasterVoteRestrictionId { get; set; }
        public string Name { get; set; }
        public byte Status { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public byte Points { get; set; }
        public byte Candidates { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
    }
}
