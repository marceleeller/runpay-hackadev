using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domain.Model;

public class Conta
{
    public string NumeroConta { get; set; }

    /* podemos definir uma agencia específica como valor base */

    public int Agencia { get; set; } = 016273;

    public int ClienteId { get; set; }

    public Cliente Cliente { get; set; }

    /* data anotation declarando que o metadado é do tipo currency (financeiro) */

    [DataType(DataType.Currency)]

    public decimal Saldo { get; set; }

    public bool StatusContaAtiva { get; set; } = true;

    /* data anotation declarando que o campo é obrigatório */

    [Required]
    public string SenhaHash { get; private set; } = null!;


}
