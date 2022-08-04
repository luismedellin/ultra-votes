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
            var users = await userService.GetAll();

            return Ok(users);
        }
    }
}
