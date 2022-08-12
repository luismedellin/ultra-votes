namespace UltraVotes.Core.DTOs
{
    public class CandidateDto
    {
        public int CandidateId { get; set; }
        public int MasterVoteId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string DepartmentId { get; set; }
        public string AreaId { get; set; }
        public string Avatar { get; set; }
        public string Description { get; set; }
        public bool IsFinalist { get; set; }
    }
}
