namespace UltraVotes.Core.DTOs
{
    public class VoteDto
    {
        public int MasterVoteId { get; set; }
        public string UserId { get; set; }
        public string CandidateId { get; set; }
        public string Message { get; set; }
        public int Points { get; set; }
        public string CreatedBy { get; set; }
    }
}
