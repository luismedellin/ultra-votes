using Microsoft.AspNetCore.Mvc;
using UltraVotes.Core.Services;

namespace UltraVotes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VotesController : ControllerBase
    {
        private readonly IVoteService voteService;

        public VotesController(IVoteService voteService)
        {
            this.voteService = voteService;
        }
    }
}
