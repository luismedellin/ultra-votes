using Dapper;
using System.Data;
using UltraVotes.Core.ViewModels;

namespace UltraVotes.Data.Repositories
{
    public class VoteRepository : IVoteRepository
    {
        private readonly IDbConnection dbConnection;

        public VoteRepository(DapperContext context)
        {
            dbConnection = context.CreateConnection();
        }
    }
}
