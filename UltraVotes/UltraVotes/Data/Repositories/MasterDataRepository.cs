using Dapper;
using System.Data;
using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public class MasterDataRepository : IMasterDataRepository
    {
        private readonly IDbConnection dbConnection;

        public MasterDataRepository(DapperContext context)
        {
            dbConnection = context.CreateConnection();
        }

        public async Task<List<MasterVoteCategoryModel>> GetCategories()
        {
            var query = @"SELECT	MasterVoteCategoryId,
		                        Description
                        FROM	votes.MasterVoteCategory
                        ORDER BY Description";

            return (await dbConnection.QueryAsync<MasterVoteCategoryModel>(query)).ToList();
        }

        public async Task<List<StatusModel>> GetStatus()
        {
            var query = @"  SELECT	StatusId,
		                            Description,
		                            SortOrder
                            FROM	votes.Status
                            ORDER BY SortOrder";

            return (await dbConnection.QueryAsync<StatusModel>(query)).ToList();
        }
    }
}
