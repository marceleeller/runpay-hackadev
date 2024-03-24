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
using Runpay.API.Shared;

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

        /// <summary>
        /// Acessar histórico de transações.
        /// </summary>
        /// <returns>Histórico de transações da conta</returns>
        /// <response code="200">Retorna o histórico de transações da contaId</response>
        /// <response code="404">Conta nao encontrada</response>
        [Authorize]
        [HttpGet("historico")]
        [ProducesResponseType(typeof(TransacaoResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Historico()
        {
            var contaIdClaim = User.FindFirst("ContaId");
            if (contaIdClaim == null) return NotFound("Conta nao encontrada");
            var id = long.Parse(contaIdClaim.Value);

            try
            {
                var response = await _transacoesService.GetHistorico(id);
                return Ok(response);
            }
            catch (ExceptionsType.NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Realizar depósito.
        /// </summary>
        /// <param name="request">Dados da requisição de depósito</param>
        /// <returns>Retorna o resultado do depósito</returns>
        /// <response code="201">Depósito realizado com sucesso</response>
        /// <response code="404">Conta nao encontrada</response>
        [Authorize]
        [HttpPost("deposito")]
        [ProducesResponseType(typeof(TransacaoResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Deposito([FromBody] DepositoRequestDto request)
        {
            var contaIdClaim = User.FindFirst("ContaId");
            if (contaIdClaim == null)
                throw new ExceptionsType.NotFoundException("Conta nao encontrada");
            var id = long.Parse(contaIdClaim.Value);

            try
            {
                var transacaoARetornar = await _transacoesService.Deposito(id, request);

                return CreatedAtAction(
                    nameof(Historico),
                    new { id = id },
                    new
                    {
                        message = "Depósito realizado com sucesso.",
                        transacao = transacaoARetornar
                    }
                );
            }
            catch (ExceptionsType.NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Realizar saque.
        /// </summary>
        /// <param name="request">Dados da requisição de saque</param>
        /// <returns>Retorna o resultado do saque</returns>
        /// <response code="201">Saque realizado com sucesso</response>
        /// <response code="400">Saque inválido</response>
        /// <response code="404">Conta nao encontrada ou não existe</response>
        [Authorize]
        [HttpPost("saque")]
        [ProducesResponseType(typeof(TransacaoResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Saque([FromBody] SaqueRequestDto request)
        {
            var contaIdClaim = User.FindFirst("ContaId");
            if (contaIdClaim == null)
                throw new ExceptionsType.NotFoundException("Conta nao encontrada");
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
            catch (ExceptionsType.NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Realizar transferencia.
        /// </summary>
        /// <param name="request">Dados da requisição de transferência</param>
        /// <returns>Retorna o resultado da transferência</returns>
        /// <response code="201">Transferência realizada com sucesso</response>
        /// <response code="400">Dados inválidos</response>
        /// <response code="404">Conta nao encontrada</response>
        [Authorize]
        [HttpPost("transferencia")]
        [ProducesResponseType(typeof(TransacaoResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Transferencia([FromBody] TransferenciaRequestDto request)
        {
            var contaIdClaim = User.FindFirst("ContaId");
            if (contaIdClaim == null)
                throw new ExceptionsType.NotFoundException("Conta nao encontrada");
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
            catch (ExceptionsType.NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}