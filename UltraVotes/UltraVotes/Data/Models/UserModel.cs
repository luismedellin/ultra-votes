namespace UltraVotes.Data.Models
{
    public class UserModel
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{Name} {LastName}";
        public string Email { get; set; }
        public string DepartmentId { get; set; }
        public string AreaId { get; set; }
        public string BossId { get; set; }
    }
}
