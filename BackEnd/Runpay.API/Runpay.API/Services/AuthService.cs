using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;
using Runpay.API.Domain.Model;
using Runpay.API.Domains.Context;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.DTOs.Responses;
using Runpay.API.Services;
using Runpay.API.Services.Interfaces;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Runpay.API.Shared;


namespace Runpay.API.Services;

public class AuthService : IAuthService
{
    private readonly RunpayDbContext _dbcontext;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;
    private readonly CongelamentoService _congelamentoService;

    public AuthService(RunpayDbContext dbcontext, IMapper mapper, IConfiguration configuration, CongelamentoService congelamentoService)
    {
        _dbcontext = dbcontext;
        _mapper = mapper;
        _configuration = configuration;
        _congelamentoService = congelamentoService;
    }

    public async Task<LoginResponseDto> Logar(LoginRequestDto loginrequest)
    {
        var contaParaLogar = await _dbcontext.Contas.Include(c => c.Cliente)
            .FirstOrDefaultAsync(c => c.Cliente.Cpf == loginrequest.Cpf);

        if (contaParaLogar == null)
            throw new ExceptionsType.UnauthorizedException("CPF ou senha inválidos");

        if (_congelamentoService.UsuarioBloqueado(loginrequest.Cpf))
            throw new ExceptionsType.UnauthorizedException("Número de tentativas de login excedido. Aguarde 30 minutos e tente novamente.");

        var verificarSenha = CriptografiaService.VerificarSenha(loginrequest.Senha, contaParaLogar?.SenhaHash ?? "");

        if (!verificarSenha)
        {
            _congelamentoService.RegistrarTentativaLoginFalhada(loginrequest.Cpf);
            throw new ExceptionsType.UnauthorizedException("CPF ou senha inválidos");
        }

        if (contaParaLogar?.StatusContaAtiva == false)
            throw new ExceptionsType.UnauthorizedException("Conta desativada");

        var clienteParaRetornar = _mapper.Map<ClienteResponseDto>(contaParaLogar?.Cliente);
        string secret = _configuration.GetSection("Secret").Value;
        var tokenARetornar = GenerateToken(contaParaLogar!, secret).ToString();

        _congelamentoService.LimparTentativasLoginFalhadas(loginrequest.Cpf);

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