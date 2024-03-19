using Runpay.API.Domain.Enums;
using Runpay.API.Domains.Models;
using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domain.Model;

public class Transacao : Entity
{
    [Required]
    public string Descricao { get; set; } = null!;
    public string? Mensagem { get; set; }
    [Required]
    public decimal Valor { get; set; }
    [Required]
    public ETipoTransacao TipoTransacao { get; set; }


    [Required]
    public int? ContaId { get; set; }
    public virtual Conta Conta { get; set; } = null!;
}