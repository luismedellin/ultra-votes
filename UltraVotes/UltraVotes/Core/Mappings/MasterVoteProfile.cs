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
                .ForMember(dest=> dest.MasterVoteCategoryId, opt=> opt.MapFrom(src=> src.Category))
                .ForMember(dest=> dest.MasterVoteRestrictionId, opt=> opt.MapFrom(src=> src.Restriction))
                .ReverseMap();
        }
    }
}
