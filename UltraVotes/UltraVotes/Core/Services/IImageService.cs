using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using UltraVotes.Core.DTOs;

namespace UltraVotes.Core.Services
{
    public interface IImageService
    {
        Task<string> SaveImage(int candidateId, IFormFile file);
        Task<string> GetImage();
    }
}
