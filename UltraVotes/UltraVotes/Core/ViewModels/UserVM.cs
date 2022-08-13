namespace UltraVotes.Core.ViewModels
{
    public class UserVM
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{Name} {LastName}";
        public string Email { get; set; }
        public string DepartmentId { get; set; }
        public string AreaId { get; set; }
        public string BossId { get; set; }
        public string Avatar { get; set; }
        public bool IsCandidated { get; set; }
    }
}
