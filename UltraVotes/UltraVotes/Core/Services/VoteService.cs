using UltraVotes.Core.DTOs;
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

        public async Task Save(VoteDto voteDto)
        {
            //TODO VALIDATE, SEND EMAIL, LOG POINTS
            //validar los puntos disponibles,.
            
            unitOfWork.Votes.Save(voteDto);
        }
    }
}
