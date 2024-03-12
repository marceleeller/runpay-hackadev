namespace Runpay.API.Domain.Model;

public class Cliente
{
    public int ClienteId { get; set; }
    public Conta Conta { get; set; } = null!;
    public string Nome { get; set; } = null!;
    public string? NomeSocial { get; set; }
    public Date DataNascimento { get; set; }
    public string Cpf { get; set; } = null!;
    public string Rg { get; set; } = null!;
    public string RgExpedidor { get; set; } = null!;
    public string RgUF { get; set; } = null!;
    public string Nacionalidade { get; set; } = null!;
    public EEstadoCivil EstadoCivil { get; set; }
    public string NomeMae { get; set; } = null!;
    public string NomePai { get; set; } = null!;
    public EGenero Genero { get; set; }
    public int Ddd { get; set; }
    public string Celular { get; set; } = null!;
    public string Email { get; set; } = null!;
    public Endereco Endereco { get; set; } = null!;

}
