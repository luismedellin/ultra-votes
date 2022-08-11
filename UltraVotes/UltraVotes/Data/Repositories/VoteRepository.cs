using Dapper;
using System.Data;
using UltraVotes.Core.DTOs;

namespace UltraVotes.Data.Repositories
{
    public class VoteRepository : IVoteRepository
    {
        private readonly IDbConnection dbConnection;

        public VoteRepository(DapperContext context)
        {
            dbConnection = context.CreateConnection();
        }

        public async Task Save(VoteDto voteDto)
        {
            dbConnection.Open();
            using var transaction = CreateTransaction();
            const string sql = @"INSERT INTO votes.Vote (MasterVoteId, UserId, CandidateId, Message, Points, CreatedDate, CreatedBy) VALUES
                                    (@MasterVoteId, @UserId, @CandidateId, @Message, @Points, GETDATE(), @CreatedBy);";
            try
            {
                await(dbConnection.ExecuteScalarAsync<int>(sql, voteDto, transaction));
                transaction.Commit();
            }
            catch (Exception e)
            {
                transaction.Rollback();
                var errorMessage = $@"Error guardando una nueva votación";
            }
            finally
            {
                dbConnection.Close();
            }
        }

        private IDbTransaction CreateTransaction()
        {
            return dbConnection.BeginTransaction(IsolationLevel.ReadCommitted);
        }
    }
}
