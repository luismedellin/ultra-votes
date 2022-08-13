using Microsoft.AspNetCore.Mvc;
using UltraVotes.Core.Services;

namespace UltraVotes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("/api/MasterVote/Users/{masterVoteId}")]
        public async Task<IActionResult> Get(int masterVoteId)
        {
            if (masterVoteId == 0) return BadRequest("Invalid parameter");

            var users = await userService.GetAll(masterVoteId);

            return Ok(users);
        }
    }
}
