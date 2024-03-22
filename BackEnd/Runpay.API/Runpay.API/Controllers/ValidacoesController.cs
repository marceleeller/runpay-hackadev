using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Runpay.API.Domains.Context;
using Runpay.API.Domains.DTOs.Responses;

namespace Runpay.API.Controllers;

[ApiController]
[Route("api/validacoes")]
public class ValidacoesController : ControllerBase
{
    private readonly RunpayDbContext _dbcontext;
    private readonly IMapper _mapper;

    public ValidacoesController(RunpayDbContext dbcontext, IMapper mapper)
    {
        _dbcontext = dbcontext;
        _mapper = mapper;
    }

    //retorna se numeroConta existe
    [HttpGet("conta/{numeroConta}")]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult GetConta(string numeroConta)
    {
        var conta = _dbcontext.Contas.Include(c => c.Cliente).FirstOrDefault(n => n.NumeroConta == numeroConta);

        if (conta == null)
            return NotFound(new { message = "Conta não encontrada" });

        var contaParaRetornar = new
        {
            numeroConta = conta.NumeroConta,
            nomeCliente = conta.Cliente.Nome
        };

        return Ok(new { contaParaRetornar });
    }

    //retorna se cpf ja foi cadastrado
    [HttpGet("{cpf}")]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult PegarPorCpf(string cpf)
    {
        var cliente = _dbcontext.Clientes.FirstOrDefault(n => n.Cpf == cpf);

        if (cliente != null)
            return BadRequest(new MessageResponse("Cliente já cadastrado"));

        return Ok(new MessageResponse("CPF não utilizado"));
    }
}
