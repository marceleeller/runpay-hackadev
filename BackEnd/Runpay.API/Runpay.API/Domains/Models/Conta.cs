using Runpay.API.Domains.Models;
using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domain.Model;

public class Conta : Entity
{
    private static int _ultimoNumeroConta = 10000000;
    public string NumeroConta { get; set; } = Interlocked.Increment(ref _ultimoNumeroConta).ToString();
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
