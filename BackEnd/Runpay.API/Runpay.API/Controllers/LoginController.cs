using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Runpay.API.Domain.Model;
using Runpay.API.Domains.Context;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.DTOs.Responses;
using Runpay.API.Services;
using Runpay.API.Services.Interfaces;

namespace Runpay.API.Controllers;

[ApiController]
[Route("api/login")]
public class LoginController : ControllerBase
{
    private readonly RunpayDbContext _dbcontext;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;
    private readonly IAuthService _authService;


    public LoginController(RunpayDbContext dbcontext, IMapper mapper, IConfiguration configuration, IAuthService authService)
    {
        _dbcontext = dbcontext;
        _mapper = mapper;
        _configuration = configuration;
        _authService = authService;

    }

    /// <summary>
    /// Realizar o login de um usuário.
    /// </summary>
    /// <param name="loginrequest">Dados da requisição para login</param>
    /// <returns>Retorna o resultado do login</returns>
    /// <response code="200">Login realizado com sucesso</response>
    /// <response code="400">Login inválido</response>
    [HttpPost]
    [ProducesResponseType(typeof(LoginResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
   public async Task<IActionResult> Logar(LoginRequestDto loginrequest)
{
    try
    {
        var response = await _authService.Logar(loginrequest);
        return Ok(response);
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}


}
