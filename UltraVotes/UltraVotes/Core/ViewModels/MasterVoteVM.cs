namespace UltraVotes.Core.ViewModels
{
    public class MasterVoteVM
    {
        public int MasterVoteId { get; set; }
        public int MasterVoteCategoryId { get; set; }
        public string Category { get; set; }
        public int MasterVoteRestrictionId { get; set; }
        public string Restriction { get; set; }
        public string Name { get; set; }
        public byte StatusId { get; set; }
        public string Status { get; set; }
        public byte Points { get; set; }
        public byte Candidates { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int Voters { get; set; }
        public int SentNotifications { get; set; }
        public string FromDateText => FromDate?.ToString("dd/MM/yyyy, HH:mm");
        public string ToDateText => ToDate?.ToString("dd/MM/yyyy, HH:mm");
    }
}
