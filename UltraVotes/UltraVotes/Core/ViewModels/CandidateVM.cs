namespace UltraVotes.Core.ViewModels
{
    public class CandidateVM
    {
        public int CandidateId { get; set; }
        public int MasterVoteId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{Name} {LastName}";
        public string DepartmentId { get; set; }
        public string AreaId { get; set; }
        public bool IsFinalist { get; set; }
        public byte Points { get; set; }
        public bool Voted { get; set; }
    }
}
