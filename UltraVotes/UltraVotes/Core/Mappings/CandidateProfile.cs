using AutoMapper;
using UltraVotes.Core.DTOs;
using UltraVotes.Core.ViewModels;
using UltraVotes.Data.Models;

namespace UltraVotes.Core.Mappings
{
    public class CandidateProfile : Profile
    {
        public CandidateProfile()
        {
            CreateMap<CandidateDto, CandidateModel>()
                //.ForMember(dest=> dest.CategoryId, opt=> opt.MapFrom(src=> src.Category))
                //.ForMember(dest=> dest.RestrictionId, opt=> opt.MapFrom(src=> src.Restriction))
                .ReverseMap();

            CreateMap<CandidateModel, CandidateVM>()
                .ReverseMap();

            CreateMap<CandidateVM, CandidateDto>()
                .ReverseMap();
        }
    }
}
