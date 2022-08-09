using Dapper;
using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public class CandidateRepository : ICandidateRepository
    {
        private readonly DapperContext _context;

        public CandidateRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<List<CandidateModel>> GetByVoteId(int voteId)
        {
            const string query = @$"SELECT CandidateId, MasterVoteId, UserId, Name, LastName, DepartmentId, AreaId, Avatar, IsFinalist
                                FROM	votes.Candidate
                                WHERE	MasterVoteId = @voteId";

            using var connection = _context.CreateConnection();
            return (await connection.QueryAsync<CandidateModel>(query, new { voteId })).ToList();
        }
    }
}
