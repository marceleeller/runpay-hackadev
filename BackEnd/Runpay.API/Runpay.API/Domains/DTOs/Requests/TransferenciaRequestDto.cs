using System.ComponentModel.DataAnnotations;

namespace DTOs.Requests
{
    public class TransferenciaRequestDto
   {
        [Required(ErrorMessage = "O campo Conta do Destinatário é obrigatório.")]
        [MaxLength(8, ErrorMessage = "O campo Conta do Destinatário deve ter no máximo 8 caracteres.")]
        public string ContaDestinatario { get; set; } = null!;

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "O campo Valor deve ser maior que zero.")]
        public decimal Valor { get; set; }

        [MaxLength(60, ErrorMessage = "O campo Mensagem deve ter no máximo 60 caracteres.")]
        public string? Mensagem { get; set; }


   }
}