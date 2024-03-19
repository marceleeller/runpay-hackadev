using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Runpay.API.Domain.Model;
using Runpay.API.Domains.Context;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.DTOs.Responses;
using Runpay.API.Services;

namespace Runpay.API.Controllers;

[ApiController]
[Route("api/login")]
public class LoginController : Controller
{
    private readonly RunpayDbContext _dbcontext;
    private readonly IMapper _mapper;

    public LoginController(RunpayDbContext dbcontext, IMapper mapper)
    {
        _dbcontext = dbcontext;
        _mapper = mapper;
    }

    // Logar um usuário
    [HttpPost]
    public IActionResult Logar(LoginRequestDto loginrequest)
    {
        var contaParaLogar = _dbcontext.Contas.Include(c => c.Cliente)
            .FirstOrDefault(c => c.Cliente.Cpf == loginrequest.Cpf);

        var verificarSenha = CriptografiaService.VerificarSenha(loginrequest.Senha, contaParaLogar?.SenhaHash ?? "");

        if (contaParaLogar == null || !verificarSenha)
            return BadRequest(new { message = "CPF ou senha inválidos" });

        if (!ModelState.IsValid) return BadRequest(ModelState);

        var clienteParaRetornar = _mapper.Map<ClienteResponseDto>(contaParaLogar.Cliente);

        var token = TokenService.GenerateToken(contaParaLogar);

        return Ok(token);
    }


}
