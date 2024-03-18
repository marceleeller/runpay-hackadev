using Runpay.API.Domain.Enums;
using Runpay.API.Domains.Models;
using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domain.Model;

public class Transacao : Entity
{
    [Required(ErrorMessage = "O campo Conta do Destinatário é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O campo Conta do Destinatário deve ter no máximo 100 caracteres.")]
    public string ContaDestinatario { get; set; } = null!;

    [Required(ErrorMessage = "O campo Nome do Destinatário é obrigatório.")]
    [MaxLength(250, ErrorMessage = "O campo Nome do Destinatário deve ter no máximo 250 caracteres.")]
    public string NomeDestinatario { get; set; } = null!;

    [MaxLength(100, ErrorMessage = "O campo Conta do Destinatário deve ter no máximo 100 caracteres.")]
    public string? Descricao { get; set; }
    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "O campo Valor deve ser maior que zero.")]
    public decimal Valor { get; set; }

    [Required(ErrorMessage = "O campo Tipo de Transação é obrigatório.")]
    public ETipoTransacao TipoTransacao { get; set; }

    [Required]
    public int? ContaId { get; set; }
    public virtual Conta Conta { get; set; } = null!;
}
