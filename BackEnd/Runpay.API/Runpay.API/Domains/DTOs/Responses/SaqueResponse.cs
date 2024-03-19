namespace Runpay.API.Domains.DTOs.Responses
{
    public class SaqueResponse
    {
        public decimal ValorSaque { get; set; } /*saldo apos o saque*/
        public string Mensagem { get; set; } = string.Empty;

        public void SetSaldoAtualizado(decimal novoSaldo)
        {
            ValorSaque = novoSaldo;
        }

        public void SetMensagem() /*criar uma mensagem de envio com sucesso ou de erro*/
        {
            Mensagem = "Saque realizado com sucesso.";
        }
    }
}
