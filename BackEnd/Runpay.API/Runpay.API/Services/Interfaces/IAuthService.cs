using Runpay.API.Domain.Model;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.DTOs.Responses;

namespace Runpay.API.Services.Interfaces;

public interface IAuthService
{
    Task<LoginResponseDto> Logar(LoginRequestDto loginrequest);
    string GenerateToken(Conta conta, string secret);

}
