using DTOs.Requests;
using Microsoft.AspNetCore.Mvc;
using Runpay.API.Domains.Context;

namespace TransacoesController.Controllers
{

    [ApiController]
    [Route("api/transacoes")]
    public class TransacoesController : ControllerBase
    {
        // Injeçao de dependencia
        private RunpayDbContext _runpayDbContext;
        public TransacoesController(RunpayDbContext runpayDbContext)
        {
            _runpayDbContext = runpayDbContext;
        }


        [HttpGet("Acessar-Historico")]
        public IActionResult GetAcessarHistorico(int accountId)
        {
            return Ok();
        }

        [HttpGet("Consultar-Saldo")]
        public IActionResult GetConsultarSaldo(int accountId)
        {
            return Ok();
        }

        [HttpPost("Realizar-Deposito")]
        public IActionResult PostRealizarDeposito([FromBody] DepositoRequest request)
        {
            return Ok();
        }

        [HttpPost("Realizar-Saque")]
        public IActionResult PostRealizarSaque([FromBody] SaqueRequest request)
        {
            return Ok();
        }

        [HttpPost("Realizar-Transferencia")]
        public IActionResult PostRealizarTransferencia([FromBody] TransferenciaRequest request)
        {
            return Ok();
        }
    }
      
}
