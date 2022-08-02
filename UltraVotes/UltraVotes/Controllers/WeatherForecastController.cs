using Microsoft.AspNetCore.Mvc;
using UltraVotes.Data;

namespace UltraVotes.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IUnitOfWork _unitOfWork;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var watch = System.Diagnostics.Stopwatch.StartNew();
            var users = await _unitOfWork.Users.GetAll();
            watch.Stop();
            var elapsedMs = watch.ElapsedMilliseconds;

            return Ok(new
            {
                time = elapsedMs,
                users,
            });
        }
    }
}