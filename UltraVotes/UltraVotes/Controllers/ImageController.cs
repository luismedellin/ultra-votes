using System.Net;
using Microsoft.AspNetCore.Mvc;
using UltraVotes.Core.Services;

namespace UltraVotes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)        {
            _imageService = imageService;
        }

        [HttpPost("{candidateId}")]
        public async Task<IActionResult> UploadImage(int candidateId)
        {
            try
            {
                var imageFile = Request.Form.Files.FirstOrDefault();
                if (imageFile is null || candidateId == 0) return BadRequest("Petición invalida.");

                var fileName = await _imageService.SaveImage(candidateId, imageFile);
                return Ok(fileName);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
    }
}
