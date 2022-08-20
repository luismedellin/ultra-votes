using FluentValidation;
using UltraVotes.Core.DTOs;

namespace UltraVotes.Core.Validators
{
    public class MasterVoteValidator : AbstractValidator<MasterVoteDto>
    {
        public MasterVoteValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithErrorCode("El nombre es requerido")
                .MaximumLength(100).WithMessage("El nombre de la votación no debe superar los 100 caracteres")
                ;
        }
    }
}
