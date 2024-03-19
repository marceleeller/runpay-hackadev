using DTOs.Requests;
using DTOs.Responses;
using Runpay.API.Domains.Context;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Runpay.API.Domain.Model;

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

        [HttpGet]
        public IActionResult GetAcessarHistorico(int accountId)
        {
            // Lógica para acessar o histórico de transações
            return Ok();
        }

        [HttpGet("saldo")]
        public IActionResult GetConsultarSaldo(int accountId)
        {
            decimal saldo = 0; // precisamos colocar um saldo?

            return Ok();
        }

        [HttpPost("deposito/{id}")]
        public IActionResult Deposito([FromBody] DepositoRequestDto request, int id)
        {

            var adicionaSaldo = _mapper.Map<Transacao>(request);

            var contaDeposito = _dbcontext.Contas.First(c => c.Id == id);

            adicionaSaldo.ContaId = contaDeposito.Id;
            adicionaSaldo.Descricao = "Depósito em conta";
            contaDeposito.Saldo += request.Valor;

            _dbcontext.Transacoes.Add(adicionaSaldo);
            _dbcontext.SaveChanges();

            return Ok(new
            {
                message = "Depósito realizado com sucesso.",
                adicionaSaldo.CriadoEm
            });
        }

        [HttpPost("saque")]
        public IActionResult PostRealizarSaque([FromBody] SaqueRequest request)
        {
            // Lógica para realizar um saque na conta
            return Ok();
        }

        [HttpPost("transferencia")]
        public IActionResult PostRealizarTransferencia([FromBody] TransferenciaRequestDto request)
        {
            // Lógica para realizar uma transferência entre contas
            return Ok("Tranferencia realizada com sucesso.");
        }
    }
}