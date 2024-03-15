using DTOs.Requests;
using Microsoft.AspNetCore.Mvc;

namespace TransacoesController.Controllers
{

    [ApiController]
    [Route("api/transacoes")]
    public class TransacoesController : ControllerBase
    {
    private readonly ITransactionService _transactionService;

        public TransacoesController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet("Acessar-Historico")]
        public IActionResult GetAcessarHistorico(int accountId)
        {
            var historico = _transactionService.GetAcessarHistorico(accountId);
            return Ok(historico);
        }

        [HttpGet("Consultar-Saldo")]
        public IActionResult GetConsultarSaldo(int accountId)
        {
            var saldo = _transactionService.GetConsultarSaldo(accountId);
            return Ok(saldo);
        }

        [HttpPost("Realizar-Deposito")]
        public IActionResult PostRealizarDeposito([FromBody] DepositoRequest request)
        {
            _transactionService.RealizarDeposito(request.AccountId, request.Amount);
            return Ok();
        }

        [HttpPost("Realizar-Saque")]
        public IActionResult PostRealizarSaque([FromBody] SaqueRequest request)
        {
            _transactionService.RealizarSaque(request.AccountId, request.Amount);
            return Ok();
        }

        [HttpPost("Realizar-Transferencia")]
        public IActionResult PostRealizarTransferencia([FromBody] TransferenciaRequest request)
        {
            _transactionService.RealizarTransferencia(request.AccountFromId, request.AccountToId, request.Amount);
            return Ok();
        }
    }
      
      /*Interface pública para o serviço de transações*/
    public interface ITransactionService 
    {
        object GetAcessarHistorico(int accountId);
        object GetConsultarSaldo(int accountId);
        void RealizarDeposito(int accountId, decimal amount);
        void RealizarSaque(int accountId, decimal amount);
        void RealizarTransferencia(int accountFromId, int accountToId, decimal amount);
    }
}
