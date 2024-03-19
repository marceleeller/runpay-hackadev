using Runpay.API.Domains.Context;
using Runpay.API.Domains.Models;
using Runpay.API.Services;
using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domain.Model;

public class Conta : Entity
{
    public string NumeroConta { get; set; } = "10000000";

    public int Agencia { get; set; } = 10008;

    [DataType(DataType.Currency)]
    public decimal Saldo { get; set; } = 0;

    public bool StatusContaAtiva { get; set; } = true;

    [Required]
    public string SenhaHash { get; private set; } = null!;
    public int ClienteId { get; set; }
    public virtual Cliente Cliente { get; set; } = null!;

    public List<Transacao> Transacoes { get; set; } = new();

}
