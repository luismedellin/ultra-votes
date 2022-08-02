using UltraVotes.Data.Models;

namespace UltraVotes.Core.Services
{
    public interface IUserService
    {
        Task<List<UserModel>> GetAll();
    }
}