using Runpay.API.Domain.Enums;
using Runpay.API.Domain.Model;

namespace Runpay.API.Domains.DTOs.Requests;

public class CadastrarClienteDto {
    public string Nome { get; set; } = null!;
    public string? NomeSocial { get; set; }
    public DateTime DataNascimento { get; set; }
    public string Cpf { get; set; } = null!;
    public string Rg { get; set; } = null!;
    public string RgExpedidor { get; set; } = null!;
    public string RgUF { get; set; } = null!;
    public string Nacionalidade { get; set; } = null!;
    public EEstadoCivil EstadoCivil { get; set; }
    public EGenero Genero { get; set; }
    public int Ddd { get; set; }
    public string Celular { get; set; } = null!;
    public string Email { get; set; } = null!;
    public EnderecoRequestDto? Endereco {get; set;}
}