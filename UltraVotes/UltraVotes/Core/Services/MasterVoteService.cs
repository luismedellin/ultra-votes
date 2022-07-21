using UltraVotes.Data;
using UltraVotes.Data.Models;

namespace UltraVotes.Core.Services
{
    public class MasterVoteService : IMasterVoteService
    {
        private readonly IUnitOfWork unitOfWork;

        public MasterVoteService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public Task<List<MasterVoteModel>> GetAllVotes()
        {
            return unitOfWork.MasterVotes.GetAllVotes();   
        }
    }
}
