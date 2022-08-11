using Dapper;
using UltraVotes.Core.ViewModels;

namespace UltraVotes.Data.Repositories
{
    public class CandidateRepository : ICandidateRepository
    {
        private readonly DapperContext _context;

        public CandidateRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<List<CandidateVM>> GetByVoteId(int voteId, string userId)
        {
            const string query = @$"DECLARE @True BIT = 1,
		                                    @False BIT = 0

                                    SELECT	c.CandidateId, c.MasterVoteId, c.UserId, Name, LastName, DepartmentId, AreaId, Avatar, IsFinalist, v.Message,
		                                    ISNULL(v.Points, 0) Points, 
		                                    CASE WHEN v.Points IS NOT NULL THEN @True ELSE @False END Voted
                                    FROM	votes.Candidate c
                                    LEFT JOIN (
		                                    SELECT MasterVoteId, CandidateId, Points, Message
		                                    FROM votes.Vote
		                                    where MasterVoteId = @voteId
		                                    and UserId = @userId
	                                    )v 
	                                    ON c.MasterVoteId = v.MasterVoteId AND c.UserId = v.CandidateId
                                    WHERE	c.MasterVoteId = @voteId AND
											c.UserId <> @UserId";

            using var connection = _context.CreateConnection();
            return (await connection.QueryAsync<CandidateVM>(query, new { voteId, userId })).ToList();
        }
    }
}
