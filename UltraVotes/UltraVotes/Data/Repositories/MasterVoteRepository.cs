﻿using Dapper;
using System.Data;
using UltraVotes.Core.ViewModels;
using UltraVotes.Data.Models;

namespace UltraVotes.Data.Repositories
{
    public class MasterVoteRepository : IMasterVoteRepository
    {
        private readonly IDbConnection dbConnection;

        public MasterVoteRepository(DapperContext context)
        {
            dbConnection = context.CreateConnection();
        }

        public async Task<List<MasterVoteVM>> GetAllVotes()
        {
            var query = @"SELECT	MasterVoteId, 
		                            MasterVoteCategoryId, 
		                            (SELECT Description FROM votes.MasterVoteCategory c WHERE c.MasterVoteCategoryId = mv.MasterVoteCategoryId)Category,
		                            MasterVoteRestrictionId, 
		                            (SELECT Description FROM votes.MasterVoteRestriction c WHERE c.RestrictionId = mv.MasterVoteRestrictionId)Restriction,
		                            Name, 
		                            StatusId,
		                            (SELECT Description FROM votes.Status s WHERE s.StatusId = mv.StatusId)Status,
		                            FromDate, 
		                            ToDate, 
		                            Points, 
		                            Candidates, 
		                            CreatedDate, 
		                            CreatedBy, 
		                            UpdatedDate, 
		                            UpdatedBy
                            FROM	votes.MasterVote mv
                            ORDER BY MasterVoteId DESC";

            return (await dbConnection.QueryAsync<MasterVoteVM>(query)).ToList();
        }

        public async Task<MasterVoteVM> GetVoteById(int masterVoteId)
        {
            var query = @"SELECT	MasterVoteId, 
		                            MasterVoteCategoryId, 
		                            (SELECT Description FROM votes.MasterVoteCategory c WHERE c.MasterVoteCategoryId = mv.MasterVoteCategoryId)Category,
		                            MasterVoteRestrictionId, 
		                            (SELECT Description FROM votes.MasterVoteRestriction c WHERE c.RestrictionId = mv.MasterVoteRestrictionId)Restriction,
		                            Name, 
		                            StatusId,
		                            (SELECT Description FROM votes.Status s WHERE s.StatusId = mv.StatusId)Status,
		                            FromDate, 
		                            ToDate, 
		                            Points, 
		                            Candidates, 
		                            CreatedDate, 
		                            CreatedBy, 
		                            UpdatedDate, 
		                            UpdatedBy
                            FROM	votes.MasterVote mv
                            WHERE   MasterVoteId = @masterVoteId";

            return (await dbConnection.QueryAsync<MasterVoteVM>(query, new { masterVoteId })).FirstOrDefault();
        }

        public async Task<List<MasterVoteVM>> GetVotesByUser(string userId)
        {
            var query = @"EXEC votes.GetVotesByUser @userId";

            return (await dbConnection.QueryAsync<MasterVoteVM>(query, new { userId })).ToList();
        }

        public async Task Save(MasterVoteModel masterVote)
        {
            dbConnection.Open();
            using var transaction = CreateTransaction();
            const string sql = @"INSERT INTO votes.MasterVote (MasterVoteCategoryId, MasterVoteRestrictionId,  Name, StatusId, FromDate, ToDate, Points, Candidates, CreatedDate, CreatedBy) OUTPUT INSERTED.MasterVoteId
                                    VALUES (@MasterVoteCategoryId, @MasterVoteRestrictionId, @Name, 1, @FromDate, @ToDate, @Points, @Candidates, GETDATE(), '$$test');";
            try
            {
                masterVote.MasterVoteId = await (dbConnection.ExecuteScalarAsync<int>(sql, masterVote, transaction));
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

        public async Task Update(MasterVoteModel masterVote)
        {
            dbConnection.Open();
            using var transaction = CreateTransaction();
            const string sql = @"UPDATE	votes.MasterVote
                                SET		MasterVoteCategoryId = @MasterVoteCategoryId,
		                                MasterVoteRestrictionId = @MasterVoteRestrictionId,
		                                Name = @Name,
		                                FromDate = @FromDate,
		                                ToDate = @ToDate,
		                                Points = @Points,
		                                Candidates = @Candidates,
		                                UpdatedBy = 'UPDATE',
		                                UpdatedDate = GETDATE()
                                WHERE	MasterVoteId = @MasterVoteId;";
            try
            {
                await (dbConnection.ExecuteScalarAsync<int>(sql, masterVote, transaction));
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
