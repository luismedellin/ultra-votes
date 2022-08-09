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

        [HttpGet("{voteId}")]
        public async Task<IActionResult> Get(int voteId)
        {
            var candidates = await candidateService.GetByVoteId(voteId);
            return Ok(candidates);
        }
    }
}
