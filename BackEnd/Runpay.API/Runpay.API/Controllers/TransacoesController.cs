using DTOs.Requests;
using DTOs.Responses;
using Runpay.API.Domains.Context;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Runpay.API.Domain.Model;
using Runpay.API.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Runpay.API.Domains.DTOs.Responses;
using Microsoft.AspNetCore.Identity.Data;
using Runpay.API.Services;
using Runpay.API.Services.Interfaces;

namespace TransacaoesController.Controllers
{
    [ApiController]
    [Route("api/transacoes")]
    public class TransacoesController : ControllerBase
    {
        private readonly RunpayDbContext _dbcontext;
        private readonly IMapper _mapper;
        private readonly ITransacoesService _transacoesService;

        public TransacoesController(RunpayDbContext dbcontext, IMapper mapper, ITransacoesService transacoesService)
        {
            _dbcontext = dbcontext;
            _mapper = mapper;
            _transacoesService = transacoesService;
        }

        // Acessar histórico
        [Authorize]
        [HttpGet("historico")]
        [ProducesResponseType(typeof(TransacaoResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Historico()
        {
            var contaIdClaim = User.FindFirst("ContaId");
            if (contaIdClaim == null) return NotFound("Conta não encontrada");
            var id = long.Parse(contaIdClaim.Value);

            try
            {
                var response = await _transacoesService.GetHistorico(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Realizar depósito
        [Authorize]
        [HttpPost("deposito")]
        [ProducesResponseType(typeof(TransacaoResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Deposito([FromBody] DepositoRequestDto request)
        {
            var contaIdClaim = User.FindFirst("ContaId");
            if (contaIdClaim == null)
                return NotFound(new MessageResponse("Conta não encontrada"));
            var id = long.Parse(contaIdClaim.Value);

            try
            {
                var transacaoARetornar = await _transacoesService.Deposito(id, request);

                return CreatedAtAction(
                    nameof(Historico),
                    new { id = id },
                    new
                    {
                        message = new MessageResponse("Depósito realizado com sucesso."),
                        transacao = transacaoARetornar
                    }
                );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // Realizar saque
        [Authorize]
        [HttpPost("saque")]
        [ProducesResponseType(typeof(TransacaoResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Saque([FromBody] SaqueRequestDto request)
        {
            var contaIdClaim = User.FindFirst("ContaId");
            if (contaIdClaim == null)
                return NotFound(new MessageResponse("Conta não encontrada"));
            var id = long.Parse(contaIdClaim.Value);

            try
            {
                var transacaoARetornar = await _transacoesService.Saque(id, request);

                return CreatedAtAction(
                    nameof(Historico),
                    new { id = id },
                    new
                    {
                        message = new MessageResponse("Saque realizado com sucesso."),
                        transacao = transacaoARetornar
                    }
                );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // Realizar transferencia
        [Authorize]
        [HttpPost("transferencia")]
        [ProducesResponseType(typeof(TransacaoResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Transferencia([FromBody] TransferenciaRequestDto request)
        {
            var contaIdClaim = User.FindFirst("ContaId");
            if (contaIdClaim == null)
                return NotFound(new MessageResponse("Conta não encontrada"));
            var id = long.Parse(contaIdClaim.Value);

            try
            {
                var transacaoARetornar = await _transacoesService.Transferencia(id, request);

                return CreatedAtAction(
                    nameof(Historico),
                    new { id = id },
                    new
                    {
                        message = new MessageResponse("Transferência realizada com sucesso."),
                        transacao = transacaoARetornar
                    }
                );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}