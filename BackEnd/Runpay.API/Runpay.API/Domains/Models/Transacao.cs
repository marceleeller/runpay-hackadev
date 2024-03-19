using Runpay.API.Domain.Enums;
using Runpay.API.Domains.Models;
using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domain.Model;

public class Transacao : Entity
{
    public string Descricao { get; set; } = null!;
    public string? Mensagem { get; set; } = null!;
    public decimal Valor { get; set; }
    public ETipoTransacao TipoTransacao { get; set; }


    [Required]
    public int? ContaId { get; set; }
    public virtual Conta Conta { get; set; } = null!;
}