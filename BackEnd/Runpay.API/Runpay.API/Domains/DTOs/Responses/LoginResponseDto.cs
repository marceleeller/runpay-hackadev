namespace Runpay.API.Domains.DTOs.Responses;

public class LoginResponseDto
{
    public ClienteResponseDto Cliente { get; set; } = null!;
    public string Token { get; set; } = null!;
    public MessageResponse Mensagem { get; set; } = null!;
}
