using Runpay.API.Domain.Enums;
using Runpay.API.Domains.Models;
using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domain.Model;

public class Transacao:Entity
{
    public string ContaDestinatario { get; set; } = null!;
    public string NomeDestinatario { get; set; } = null!;
    public string? Descricao { get; set; }
    [Required]
    public decimal Valor { get; set; }
    [Required]
    public ETipoTransacao TipoTransacao { get; set; }
    [Required]
    public int ContaId { get; set; }
    public virtual Conta Conta { get; set; } = null!;
}
