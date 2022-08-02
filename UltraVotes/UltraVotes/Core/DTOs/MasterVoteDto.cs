namespace UltraVotes.Core.DTOs
{
    public class MasterVoteDto
    {
        public int MasterVoteId { get; set; }
        public int MasterVoteCategoryId { get; set; }
        public int MasterVoteRestrictionId { get; set; }
        public string Name { get; set; }
        public byte Points { get; set; }
        public byte Candidates { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        
    }
}
