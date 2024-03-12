namespace Runpay.API.Domain.Model;

public class Endereco
{
    public string Rua { get; set; } = null!;
    public int Numero { get; set; }
    public string Bairro { get; set; } = null!;
    public string Cidade { get; set; } = null!;
    public string Estado { get; set; } = null!;
    public string Cep { get; set; } = null!;
    public string? Complemento { get; set; }
    public long ClienteId { get; set; }
    public Cliente Cliente { get; set; } = null!;

}
