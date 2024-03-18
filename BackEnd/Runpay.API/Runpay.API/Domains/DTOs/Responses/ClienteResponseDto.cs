using Runpay.API.Domain.Enums;
using Runpay.API.Domains.DTOs.Requests;

namespace Runpay.API.Domains.DTOs.Responses;

public class ClienteResponseDto
{
    public string Nome { get; set; } = null!;
    public string? NomeSocial { get; set; }
    public string Cpf { get; set; } = null!;
    public string Rg { get; set; } = null!;
    public EEstadoCivil EstadoCivil { get; set; }
    public EGenero Genero { get; set; }
    public string Email { get; set; } = null!;
    public ContaResponseDto Conta { get; set; } = null!;
}
