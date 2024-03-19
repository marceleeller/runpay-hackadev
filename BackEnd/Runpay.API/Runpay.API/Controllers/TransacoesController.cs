using AutoMapper;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.DTOs.Responses;
using Runpay.API.Domains.Context;
using Microsoft.AspNetCore.Mvc;
using Runpay.API.Domains.Models;

namespace Runpay.API.Controllers;
[ApiController]
[Route("api/transacoes")]
public class TransacoesController : ControllerBase
{
    // Injeçao de dependencia
    private readonly RunpayDbContext _dbContext;
    private readonly IMapper _mapper;
    public TransacoesController(RunpayDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    [HttpGet("Acessar-Historico")]
    public IActionResult GetAcessarHistorico(int ContaId)
    {
        var transacoes = _dbContext.Transacoes.ToList();

        return Ok(transacoes);
    }

    [HttpGet("Consultar-Saldo")]
    public IActionResult GetConsultarSaldo(int accountId)
    {
        var conta = _dbContext.Contas.FirstOrDefault(c => c.Id == accountId);
        if (conta == null)
        {
            return NotFound("Conta não encontrada");
        }
        var saldoResponse = new ConsultaSaldoResponse
        {
            ContaId = conta.Id,
            ConsultarSaldo = conta.Saldo,
            Mensagem = "Consulta de saldo realizada com sucesso."
        };
        return Ok(saldoResponse);
    }


    [HttpPost("Realizar-Deposito")]
    public IActionResult PostRealizarDeposito([FromBody] DepositoRequest request)
    {
        var response = new DepositoResponse
        {
            ValorDeposito = request.ValorDeposito,
            Mensagem = "Depósito realizado com sucesso."
        };
        return Ok(response);
    }

    [HttpPost("Realizar-Saque")]
    public IActionResult PostRealizarSaque([FromBody] SaqueRequest request)
    {
        if (PostRealizarSaque == null) {
            return NotFound("Saldo Insuficiente.");
        }
        return Ok ("Saque realizado com sucesso.");
    }

    [HttpPost("Realizar-Transferencia")]
    public IActionResult PostRealizarTransferencia([FromBody] TransferenciaRequest request)
    {
        // Lógica para realizar uma transferência entre contas
        return Ok("Tranferencia realizada com sucesso.");
    }
}


