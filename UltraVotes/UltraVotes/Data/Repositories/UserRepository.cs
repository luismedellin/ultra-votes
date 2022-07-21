using Dapper;
using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DapperContext _context;

        public UserRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<List<UserModel>> GetUsers()
        {
            var query = "SELECT * FROM votes.Users";
            using var connection = _context.CreateConnection();
            return (await connection.QueryAsync<UserModel>(query)).ToList();
        }
    }
}
