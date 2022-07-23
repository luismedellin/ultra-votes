using Microsoft.AspNetCore.Mvc;
using UltraVotes.Core.DTOs;
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


        [HttpPost()]
        public async Task<IActionResult> Post(MasterVoteDto masterVote)
        {
            try
            {
                await masterVoteService.SaveMasterVote(masterVote);
                return Ok(masterVote);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
