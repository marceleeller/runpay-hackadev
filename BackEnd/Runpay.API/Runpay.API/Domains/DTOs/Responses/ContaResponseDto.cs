namespace Runpay.API.Domains.DTOs.Responses;

public class ContaResponseDto
{
    public int Id { get; set; }
    public string Agencia { get; set; } = null!;
    public string NumeroConta { get; set; } = null!;
    public decimal Saldo { get; set; }
}
