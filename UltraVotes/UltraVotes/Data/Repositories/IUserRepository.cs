using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public interface IUserRepository
    {
        Task<List<UserModel>> GetUsers();
    }
}
