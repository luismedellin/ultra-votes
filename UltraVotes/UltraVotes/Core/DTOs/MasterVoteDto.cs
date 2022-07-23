namespace UltraVotes.Core.DTOs
{
    public class MasterVoteDto
    {
        public int MasterVoteCategoryId { get; set; }
        public string Name { get; set; }
        public byte Status { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public byte Points { get; set; }
    }
}
