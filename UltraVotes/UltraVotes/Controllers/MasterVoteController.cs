using Microsoft.AspNetCore.Mvc;
using UltraVotes.Core.Services;

namespace UltraVotes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MasterVoteController : ControllerBase
    {
        private readonly IMasterVoteService masterVoteService;

        public MasterVoteController(IMasterVoteService masterVoteService)
        {
            this.masterVoteService = masterVoteService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> Get()
        {
            var masterVotes = await masterVoteService.GetAllVotes();

            return Ok(masterVotes);
        }
    }
}
