using DTOs.Requests;
using DTOs.Responses;
using Runpay.API.Domains.Context;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Runpay.API.Domain.Model;
using Runpay.API.Domain.Enums;
using Microsoft.EntityFrameworkCore;

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
        [HttpGet("{id}")]
        public IActionResult Historico(int id)
        {
            var conta = _dbcontext.Contas.First(c => c.Id == id);

            var listaTransacoes = _dbcontext.Transacoes.Where(t => t.ContaId == conta.Id).ToList();

            var response = listaTransacoes.Select(t => _mapper.Map<TransacaoResponseDto>(t))
                .OrderByDescending(t => t.DataOperacao);

            return Ok(response);
        }

        // Realizar depósito
        [HttpPost("deposito{id}")]
        public IActionResult Deposito([FromBody] DepositoRequestDto request, int id)
        {

            var adicionaSaldo = _mapper.Map<Transacao>(request);

            var contaDeposito = _dbcontext.Contas.First(c => c.Id == id);

            adicionaSaldo.ContaId = contaDeposito.Id;
            adicionaSaldo.Descricao = "Depósito em conta";
            adicionaSaldo.TipoTransacao = ETipoTransacao.Deposito;
            contaDeposito.Saldo += request.Valor;

            _dbcontext.Transacoes.Add(adicionaSaldo);
            _dbcontext.SaveChanges();

            return Ok(new
            {
                message = "Depósito realizado com sucesso.",
                adicionaSaldo.CriadoEm
            });
        }

        // Realizar saque
        [HttpPost("saque{id}")]
        public IActionResult Saque([FromBody] SaqueRequestDto request, int id)
        {
            var saque = _mapper.Map<Transacao>(request);
            var contaSaque = _dbcontext.Contas.First(c => c.Id == id);

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

            return Ok(new
            {
                message = "Saque realizado com sucesso.",
                saque.CriadoEm
            });
        }

        // Realizar transferencia
        [HttpPost("transferencia{id}")]
        public IActionResult Transferencia([FromBody] TransferenciaRequestDto request, int id)
        {
            var contaRemetente = _dbcontext.Contas.Include(c => c.Cliente).First(c => c.Id == id);

            var contaDestinatario = _dbcontext.Contas.Include(c => c.Cliente).FirstOrDefault(c => c.NumeroConta == request.ContaDestinatario);

            // validacoes
            if (contaDestinatario == null)
                return BadRequest("Conta destinatária não encontrada.");

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

            return Ok(new
            {
                message = "Transferência realizada com sucesso.",
                transferenciaDestinatario.CriadoEm
            });
        }
    }
}