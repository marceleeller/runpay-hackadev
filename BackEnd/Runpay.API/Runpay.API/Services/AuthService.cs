using Microsoft.IdentityModel.Tokens;
using System.Text;
using Runpay.API.Domain.Model;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using Runpay.API.Domains.Context;
using Microsoft.EntityFrameworkCore;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.DTOs.Responses;
using Runpay.API.Services.Interfaces;

namespace Runpay.API.Services;

public class AuthService : IAuthService
{
    private readonly RunpayDbContext _dbcontext;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    public AuthService(RunpayDbContext dbcontext, IMapper mapper, IConfiguration configuration)
    {
        _dbcontext = dbcontext;
        _mapper = mapper;
        _configuration = configuration;
    }

    public async Task<LoginResponseDto> Logar(LoginRequestDto loginrequest)
    {
        var contaParaLogar = await _dbcontext.Contas.Include(c => c.Cliente)
            .FirstOrDefaultAsync(c => c.Cliente.Cpf == loginrequest.Cpf);

        if (contaParaLogar == null)
            throw new Exception("CPF ou senha inválidos");

        var verificarSenha = CriptografiaService.VerificarSenha(loginrequest.Senha, contaParaLogar?.SenhaHash ?? "");

        if (!verificarSenha)
            throw new Exception("CPF ou senha inválidos");

        if (contaParaLogar?.StatusContaAtiva == false)
            throw new Exception("Conta desativada");

        var clienteParaRetornar = _mapper.Map<ClienteResponseDto>(contaParaLogar?.Cliente);
        string secret = _configuration.GetSection("Secret").Value;
        var tokenARetornar = GenerateToken(contaParaLogar!, secret).ToString();

        return new LoginResponseDto
        {
            Mensagem = new MessageResponse("Logado com sucesso"),
            Cliente = clienteParaRetornar,
            Token = tokenARetornar!
        };
    }

    public string GenerateToken(Conta conta, string secret)
    {
        var key = Encoding.ASCII.GetBytes(secret);
        var tokenConfig = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("ContaId", conta.Id.ToString()),
                new Claim("NumeroConta", conta.NumeroConta.ToString()),
            }),

            Expires = DateTime.UtcNow.AddMinutes(15),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key), 
                SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenConfig);
        var tokenString = tokenHandler.WriteToken(token);

        return tokenString;

    }
}
