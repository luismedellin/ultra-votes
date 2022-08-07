using UltraVotes.Core.ViewModels;
using UltraVotes.Data;

namespace UltraVotes.Core.Services
{
    public class VoteService: IVoteService
    {
        private readonly IUnitOfWork unitOfWork;

        public VoteService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
    }
}
