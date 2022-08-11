namespace UltraVotes.Data.Models
{
    public class MasterVoteModel
    {
        public int MasterVoteId { get; set; }
        public int CategoryId { get; set; }
        public int RestrictionId { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
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
