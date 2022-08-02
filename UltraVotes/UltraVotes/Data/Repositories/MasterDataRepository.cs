using Dapper;
using System.Data;
using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public class MasterDataRepository : IMasterDataRepository
    {
        private readonly ILogger<MasterDataRepository> logger;
        private readonly IDbConnection dbConnection;

        public MasterDataRepository(ILogger<MasterDataRepository> logger, DapperContext context)
        {
            this.logger = logger;
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

            try
            {
                return (await dbConnection.QueryAsync<StatusModel>(query)).ToList();
            }
            catch (Exception e)
            {
                this.logger.LogError(query, e.Message);
                throw; 
            }
        }

        public async Task<List<MasterVoteRestrictionModel>> GetRestrictions()
        {
            var query = @"  SELECT	RestrictionId,
		                            Description,
		                            SortOrder
                            FROM	votes.MasterVoteRestriction
                            ORDER BY SortOrder";

            try
            {
                return (await dbConnection.QueryAsync<MasterVoteRestrictionModel>(query)).ToList();
            }
            catch (Exception e)
            {
                this.logger.LogError(query, e.Message);
                throw;
            }
        }
    }
}
