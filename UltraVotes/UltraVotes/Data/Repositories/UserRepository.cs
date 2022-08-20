using Dapper;
using UltraVotes.Core.ViewModels;
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

        public async Task<List<UserVM>> GetAll(int masterVoteId)
        {
            var query = @$"DECLARE  @True BIT = 1,
                                    @False BIT = 0

                        SELECT u.UserId, u.Name, u.LastName, u.Email, u.DepartmentId, u.AreaId, u.BossId, u.Avatar,
		                        CASE WHEN c.UserId IS NULL THEN @False ELSE @True END IsCandidated
                        FROM    votes.Users u
                        LEFT JOIN(
                            SELECT mv.MasterVoteId, c.UserId
                            FROM    votes.MasterVote mv

                            INNER JOIN votes.Candidate c ON c.MasterVoteId = mv.MasterVoteId
                            WHERE	mv.CategoryId = 1 AND
                        			mv.MasterVoteId =  CASE WHEN @masterVoteId = 0 THEN mv.MasterVoteId ELSE @masterVoteId END
                        )c ON u.UserId = c.UserId
                        ORDER BY u.Name";
            using var connection = _context.CreateConnection();
            return (await connection.QueryAsync<UserVM>(query, new { masterVoteId })).ToList();
        }
    }
}
