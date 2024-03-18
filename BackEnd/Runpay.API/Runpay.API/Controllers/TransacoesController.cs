using DTOs.Requests;
using DTOs.Responses;
using Microsoft.AspNetCore.Mvc;

namespace TransacaoesController.Controllers
{
    [ApiController]
    [Route("api/transacoes")] 
    public class TransacoesController : ControllerBase
    {

        [HttpGet("Acessar-Historico")]
        public IActionResult GetAcessarHistorico(int accountId)
        {
            // Lógica para acessar o histórico de transações
            return Ok();
        }

        [HttpGet("Consultar-Saldo")]
        public IActionResult GetConsultarSaldo(int accountId)
        {
             decimal saldo = 0; // precisamos colocar um saldo?

            // Lógica para consultar o saldo da conta
            var response = new ConsultaSaldoResponse
            {
                ConsultarSaldo = saldo,
                Mensagem = "Consulta de saldo realizada com sucesso."
            };
            return Ok(response);
        }

        [HttpPost("Realizar-Deposito")]
        public IActionResult PostRealizarDeposito([FromBody] DepositoRequest request)
        {
            // Lógica para realizar um depósito na conta
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
            // Lógica para realizar um saque na conta
            /*return Ok("Realizando saque de " + request.Amount + " na conta com o ID: " + request.AccountId);*/
            return Ok();
        }

        [HttpPost("Realizar-Transferencia")]
        public IActionResult PostRealizarTransferencia([FromBody] TransferenciaRequest request)
        {
            // Lógica para realizar uma transferência entre contas
            /*return Ok("Realizando transferência de " + request.Amount + " da conta com o ID: " + request.AccountFromId + " para a conta com o ID: " + request.AccountToId);*/
            return Ok("Tranferencia realizada com sucesso.");
        }
    }
}

