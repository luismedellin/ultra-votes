using AutoMapper;
using UltraVotes.Core.DTOs;
using UltraVotes.Data.Models;

namespace UltraVotes.Core.Mappings
{
    public class MasterVoteProfile : Profile
    {
        public MasterVoteProfile()
        {
            CreateMap<MasterVoteDto, MasterVoteModel>()
                //.ForMember(dest=> dest.CategoryId, opt=> opt.MapFrom(src=> src.Category))
                //.ForMember(dest=> dest.RestrictionId, opt=> opt.MapFrom(src=> src.Restriction))
                .ReverseMap();
        }
    }
}
