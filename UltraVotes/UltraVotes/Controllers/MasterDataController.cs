using Microsoft.AspNetCore.Mvc;
using UltraVotes.Core.Services;

namespace UltraVotes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MasterDataController : ControllerBase
    {
        private readonly IMasterDataService masterDataService;

        public MasterDataController(IMasterDataService masterDataService)
        {
            this.masterDataService = masterDataService;
        }

        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            var masterVotes = await masterDataService.GetMasterData();
            return Ok(masterVotes);
        }
    }
}
