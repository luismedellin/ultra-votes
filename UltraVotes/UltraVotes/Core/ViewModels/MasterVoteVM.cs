namespace UltraVotes.Core.ViewModels
{
    public class MasterVoteVM
    {
        public int MasterVoteId { get; set; }
        public int CategoryId { get; set; }
        public string Category { get; set; }
        public int RestrictionId { get; set; }
        public string Restriction { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public byte StatusId { get; set; }
        public string Status { get; set; }
        public int VotedPoints { get; set; }
        public byte Points { get; set; }
        public int Votes { get; set; }
        public byte Candidates { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public bool IsAvailable { get; set; }
        public int Voters { get; set; }
        public int SentNotifications { get; set; }
        public string FromDateText => FromDate?.ToString("dd/MM/yyyy, HH:mm");
        public string ToDateText => ToDate?.ToString("dd/MM/yyyy, HH:mm");

        public int Value => MasterVoteId;
        public string Label => Title;
    }
}
