using Microsoft.AspNetCore.Mvc;
using UltraVotes.Core.Services;

namespace UltraVotes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CandidatesController : ControllerBase
    {
        private readonly ICandidateService candidateService;

        public CandidatesController(ICandidateService candidateService)
        {
            this.candidateService = candidateService;
        }

        [HttpGet("{masterVoteId}")]
        public async Task<IActionResult> Get(int masterVoteId)
        {
            var candidates = await candidateService.GetFinalCandidates(masterVoteId);
            return Ok(candidates);
        }

        [HttpGet("{voteId}/{userId}")]
        public async Task<IActionResult> Get(int voteId, string userId)
        {
            var candidates = await candidateService.GetByVoteId(voteId, userId);
            return Ok(candidates);
        }
    }
}
