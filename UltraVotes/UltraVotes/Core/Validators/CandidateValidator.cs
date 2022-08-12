using FluentValidation;
using UltraVotes.Core.DTOs;

namespace UltraVotes.Core.Validators
{
    public class CandidateValidator : AbstractValidator<CandidateDto>
    {
        public CandidateValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithErrorCode("El nombre es requerido")
                .MaximumLength(100).WithMessage("El nombre del candidato no debe superar los 100 caracteres")
                ;
        }
    }
}
