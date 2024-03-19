using System.ComponentModel.DataAnnotations;

namespace DTOs.Requests
{
    public class SaqueRequestDto
    {
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "O campo Valor deve ser maior que zero.")]
        public decimal Valor { get; set; }

    }
}
