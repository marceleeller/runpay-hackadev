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

namespace TransacaoesController.Controllers
{
    [ApiController]
    [Route("api/transacoes")]
    public class TransacoesController : ControllerBase
    {
        private readonly RunpayDbContext _dbcontext;
        private readonly IMapper _mapper;
        public TransacoesController(RunpayDbContext dbcontext, IMapper mapper)
        {
            _dbcontext = dbcontext;
            _mapper = mapper;
        }

        // Acessar histórico
        [Authorize]
        [HttpGet("historico/{id}")]
        [ProducesResponseType(typeof(TransacaoResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
        public IActionResult Historico(int id)
        {
            var conta = _dbcontext.Contas.First(c => c.Id == id);

            if (conta == null)
                return NotFound(new MessageResponse("Conta não encontrada"));

            var listaTransacoes = _dbcontext.Transacoes.Where(t => t.ContaId == conta.Id).ToList();

            var response = listaTransacoes
                .Select(t => _mapper.Map<TransacaoResponseDto>(t))
                .OrderByDescending(t => t.DataOperacao);

            return Ok(response);
        }

        // Realizar depósito
        [Authorize]
        [HttpPost("deposito/{id}")]
        [ProducesResponseType(typeof(TransacaoResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
        public IActionResult Deposito([FromBody] DepositoRequestDto request, int id)
        {

            var adicionaSaldo = _mapper.Map<Transacao>(request);

            var contaDeposito = _dbcontext.Contas.First(c => c.Id == id);

            if (contaDeposito == null)
                return NotFound(new MessageResponse("Conta não encontrada"));

            adicionaSaldo.ContaId = contaDeposito.Id;
            adicionaSaldo.Descricao = "Depósito em conta";
            adicionaSaldo.TipoTransacao = ETipoTransacao.Deposito;
            contaDeposito.Saldo += request.Valor;

            _dbcontext.Transacoes.Add(adicionaSaldo);
            _dbcontext.SaveChanges();

            var transacaoARetornar = _mapper.Map<TransacaoResponseDto>(adicionaSaldo);

            return CreatedAtAction(
                nameof(Historico),
                new { id = contaDeposito.Id },
                new
                {
                    message = new MessageResponse("Depósito realizado com sucesso."),
                    transacao = transacaoARetornar
                }
            );
        }

        // Realizar saque
        [Authorize]
        [HttpPost("saque/{id}")]
        [ProducesResponseType(typeof(TransacaoResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
        public IActionResult Saque([FromBody] SaqueRequestDto request, int id)
        {
            var saque = _mapper.Map<Transacao>(request);
            var contaSaque = _dbcontext.Contas.First(c => c.Id == id);

            if (contaSaque == null)
                return NotFound(new MessageResponse("Conta não encontrada"));

            if (contaSaque.Saldo < request.Valor)
            {
                return BadRequest("Saldo insuficiente.");
            }

            saque.ContaId = contaSaque.Id;
            saque.Descricao = "Saque em conta";
            saque.TipoTransacao = ETipoTransacao.Saque;
            contaSaque.Saldo -= request.Valor;

            _dbcontext.Transacoes.Add(saque);
            _dbcontext.SaveChanges();

            var transacaoARetornar = _mapper.Map<TransacaoResponseDto>(saque);

            return CreatedAtAction(
                nameof(Historico),
                new { id = contaSaque.Id },
                new
                {
                    message = new MessageResponse("Saque realizado com sucesso."),
                    transacao = transacaoARetornar
                }
            );
        }

        // Realizar transferencia
        [Authorize]
        [HttpPost("transferencia/{id}")]
        [ProducesResponseType(typeof(TransacaoResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
        public IActionResult Transferencia([FromBody] TransferenciaRequestDto request, int id)
        {
            var contaRemetente = _dbcontext.Contas.Include(c => c.Cliente).First(c => c.Id == id);
            var contaDestinatario = _dbcontext.Contas.Include(c => c.Cliente).FirstOrDefault(c => c.NumeroConta == request.ContaDestinatario);

            var verificarSenha = CriptografiaService.VerificarSenha(request.Senha, contaRemetente?.SenhaHash ?? "");
            if (contaRemetente == null || !verificarSenha)
                return BadRequest(new { message = "Senha inválida" });

            if(request.Valor > contaRemetente.Saldo) 
                return BadRequest(new { message = "Saldo insuficiente" });

            // validacoes
            if (contaDestinatario == null)
                return NotFound("Conta destinatária não encontrada.");

            if (contaRemetente.Id == contaDestinatario.Id)
                return BadRequest("Não é possível transferir para a mesma conta.");

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            if (contaRemetente.Saldo < request.Valor)
                return BadRequest("Saldo insuficiente.");

            // transferencia
            var transferenciaRemetente = new Transacao
            {
                ContaId = contaRemetente.Id,
                Descricao = "Para " + contaDestinatario.Cliente.Nome,
                Mensagem = request.Mensagem,
                TipoTransacao = ETipoTransacao.Transferencia,
                Valor = request.Valor
            };

            var transferenciaDestinatario = new Transacao
            {
                ContaId = contaDestinatario!.Id,
                Descricao = "De " + contaRemetente.Cliente.Nome,
                Mensagem = request.Mensagem,
                TipoTransacao = ETipoTransacao.Transferencia,
                Valor = request.Valor
            };

            contaRemetente.Saldo -= request.Valor;
            contaDestinatario.Saldo += request.Valor;

            _dbcontext.Transacoes.Add(transferenciaRemetente);
            _dbcontext.Transacoes.Add(transferenciaDestinatario);

            _dbcontext.SaveChanges();

            var transacaoARetornar = _mapper.Map<TransacaoResponseDto>(transferenciaRemetente);

            return CreatedAtAction(
                nameof(Historico),
                new { id = contaRemetente.Id },
                new
                {
                    message = new MessageResponse("Depósito realizado com sucesso."),
                    transacao = transacaoARetornar
                }
            );
        }
    }
}