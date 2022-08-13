using Microsoft.AspNetCore.Authorization;
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
            var users = await _unitOfWork.Users.GetAll(1);
            watch.Stop();
            var elapsedMs = watch.ElapsedMilliseconds;

            return Ok(new
            {
                time = elapsedMs,
                users,
            });
        }

        [Authorize]
        [HttpGet("/api/weather")]
        public async Task<IActionResult> Get2()
        {

            return Ok("api/weather");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("/api/weather2")]
        public async Task<IActionResult> GetAdmin()
        {

            return Ok("api/weather/GetAdmin");
        }

        [Authorize(Roles = "Api.Read")]
        [HttpGet("/api/weather3")]
        public async Task<IActionResult> GetEmpleado()
        {

            return Ok("api/weather/GetEmpleado");
        }
    }
}