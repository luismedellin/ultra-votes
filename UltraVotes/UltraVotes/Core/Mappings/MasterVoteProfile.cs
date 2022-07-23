using AutoMapper;
using UltraVotes.Core.DTOs;
using UltraVotes.Data.Models;

namespace UltraVotes.Core.Mappings
{
    public class MasterVoteProfile : Profile
    {
        public MasterVoteProfile()
        {
            CreateMap<MasterVoteModel, MasterVoteDto>().ReverseMap();
        }
    }
}
