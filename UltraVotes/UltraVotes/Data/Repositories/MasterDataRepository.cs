using Dapper;
using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public class MasterDataRepository : IMasterDataRepository
    {
        private readonly DapperContext _context;

        public MasterDataRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<List<MasterVoteCategoryModel>> GetCategories()
        {
            var query = @"SELECT	MasterVoteCategoryId,
		                        Description
                        FROM	votes.MasterVoteCategory
                        ORDER BY Description";

            using var connection = _context.CreateConnection();
            return (await connection.QueryAsync<MasterVoteCategoryModel>(query)).ToList();
        }

        public async Task<List<StatusModel>> GetStatus()
        {
            var query = @"  SELECT	StatusId,
		                            Description,
		                            SortOrder
                            FROM	votes.Status
                            ORDER BY SortOrder";

            using var connection = _context.CreateConnection();
            return (await connection.QueryAsync<StatusModel>(query)).ToList();
        }
    }
}
