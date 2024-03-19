using System.ComponentModel.DataAnnotations;

namespace DTOs.Requests
{
    public class DepositoRequestDto
    {
        [Required]
        [Range(20, double.MaxValue, ErrorMessage = "O campo Valor deve ser maior que vinte.")]
        public decimal Valor { get; set; }
    
    }
}
