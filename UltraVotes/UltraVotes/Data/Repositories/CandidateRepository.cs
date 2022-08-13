using Dapper;
using System.Data;
using UltraVotes.Core.ViewModels;
using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public class CandidateRepository : ICandidateRepository
    {
        private readonly IDbConnection dbConnection;

        public CandidateRepository(DapperContext context)
        {
            dbConnection = context.CreateConnection();
        }

        public async Task<List<CandidateVM>> GetFinalCandidates(int masterVoteId)
        {
            const string query = @$"SELECT	CandidateId, MasterVoteId, UserId, Name, LastName, DepartmentId, AreaId, Avatar, Description, IsFinalist
                                    FROM	votes.Candidate
                                    WHERE	MasterVoteId = @masterVoteId";

            return (await dbConnection.QueryAsync<CandidateVM>(query, new { masterVoteId })).ToList();
        }

        public async Task<List<CandidateVM>> GetByVoteId(int voteId, string userId)
        {
            const string query = @$"DECLARE @True BIT = 1,
		                                    @False BIT = 0

                                    SELECT	c.CandidateId, c.MasterVoteId, c.UserId, Name, LastName, DepartmentId, AreaId, Avatar, Description, IsFinalist, v.Message,
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

            return (await dbConnection.QueryAsync<CandidateVM>(query, new { voteId, userId })).ToList();
        }

        public async Task Save(CandidateModel candidate)
        {
            dbConnection.Open();
            using var transaction = CreateTransaction();
            const string sql = @"INSERT INTO votes.Candidate (MasterVoteId, UserId, Name, LastName, DepartmentId, AreaId, Avatar, Description, IsFinalist)  OUTPUT INSERTED.CandidateId
                                    VALUES (@MasterVoteId, @UserId, @Name, @LastName, @DepartmentId, @AreaId, @Avatar, @Description, @IsFinalist);";
            try
            {
                candidate.CandidateId = await (dbConnection.ExecuteScalarAsync<int>(sql, candidate, transaction));
                transaction.Commit();
            }
            catch (Exception e)
            {
                transaction.Rollback();
                var errorMessage = $@"Error guardando el candidato {candidate.UserId} a la votación {candidate.MasterVoteId}";
            }
            finally
            {
                dbConnection.Close();
            }
        }


        public async Task Update(CandidateModel candidate)
        {
            dbConnection.Open();
            using var transaction = CreateTransaction();
            const string sql = @"UPDATE	votes.Candidate
                                SET		Avatar = @Avatar,
		                                Description = @Description
                                WHERE	CandidateId = @CandidateId;";
            try
            {
                await (dbConnection.ExecuteScalarAsync<int>(sql, candidate, transaction));
                transaction.Commit();
            }
            catch (Exception e)
            {
                transaction.Rollback();
                var errorMessage = $@"Error actualizado el candidate {candidate.CandidateId}";
            }
            finally
            {
                dbConnection.Close();
            }
        }

        public async Task Delete(int candidateId)
        {
            dbConnection.Open();
            using var transaction = CreateTransaction();
            const string sql = @"DELETE FROM votes.Candidate WHERE CandidateId = @candidateId;";
            try
            {
                await (dbConnection.ExecuteScalarAsync<int>(sql, new { candidateId }, transaction));
                transaction.Commit();
            }
            catch (Exception e)
            {
                transaction.Rollback();
                var errorMessage = $@"Error al borrar el usuario de la votación: {candidateId}";
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
