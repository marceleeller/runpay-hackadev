using Runpay.API.Domains.Models;
using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domain.Model;

public class Conta : Entity
{
    private readonly Random _random = new Random();
    public string NumeroConta { get; set; } = null!;
    public int Agencia { get; set; } = 00008;

    [DataType(DataType.Currency)]

    public decimal Saldo { get; set; }

    public bool StatusContaAtiva { get; set; } = true;

    [Required]
    public string SenhaHash { get; private set; } = null!;

    public int ClienteId { get; set; }
    public virtual Cliente Cliente { get; set; } = null!;

    public List<Transacao> Transacoes { get; set; } = new();

}
