using Dapper;
using UltraVotes.Core.ViewModels;
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

        public async Task<List<MasterVoteVM>> GetAllVotes()
        {
            var query = @"SELECT	MasterVoteId, 
		                            MasterVoteCategoryId, 
		                            (SELECT Description FROM votes.MasterVoteCategory c WHERE c.MasterVoteCategoryId = mv.MasterVoteCategoryId)Category,
		                            Name, 
		                            StatusId,
		                            (SELECT Description FROM votes.Status s WHERE s.StatusId = mv.StatusId)Status,
		                            FromDate, 
		                            ToDate, 
		                            Points, 
		                            CreatedDate, 
		                            CreatedBy, 
		                            UpdatedDate, 
		                            UpdatedBy
                            FROM	votes.MasterVote mv
                            ORDER BY MasterVoteId DESC";

            using var connection = _context.CreateConnection();
            return (await connection.QueryAsync<MasterVoteVM>(query)).ToList();
        }
    }
}
