using Dapper;
using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public class MasterVoteRepository : IMasterVoteRepository
    {
        private readonly DapperContext _context;

        public MasterVoteRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<List<MasterVoteModel>> GetAllVotes()
        {
            var query = @"SELECT	MasterVoteId, 
		                        MasterVoteCategoryId, 
		                        Name, 
		                        Status, 
		                        FromDate, 
		                        ToDate, 
		                        Points, 
		                        CreatedDate, 
		                        CreatedBy, 
		                        UpdatedDate, 
		                        UpdatedBy
                        FROM	votes.MasterVote
                        ORDER BY MasterVoteId DESC";

            using var connection = _context.CreateConnection();
            return (await connection.QueryAsync<MasterVoteModel>(query)).ToList();
        }
    }
}
