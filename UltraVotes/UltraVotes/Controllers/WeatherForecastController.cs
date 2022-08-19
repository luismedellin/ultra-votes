using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UltraVotes.Core.Services;
using UltraVotes.Data;

namespace UltraVotes.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IImageService imageService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, 
            IUnitOfWork unitOfWork, IImageService imageService)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            this.imageService = imageService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await imageService.GetImage();

                var watch = System.Diagnostics.Stopwatch.StartNew();
                var users = await _unitOfWork.Users.GetAll(4);
                watch.Stop();
                var elapsedMs = watch.ElapsedMilliseconds;

                return Ok(new
                {
                    time = elapsedMs,
                    users,
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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