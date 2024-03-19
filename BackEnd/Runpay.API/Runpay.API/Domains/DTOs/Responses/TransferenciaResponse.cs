namespace Runpay.API.Domains.DTOs.Responses
{
    public class TransferenciaResponse
    {
        public decimal ContaOrigem { get; set; }
        public decimal ContaDestino { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public string? Mensagem { get; set; } /*para descrição opcional*/

        public void SetTransferirDaContaId(decimal saldo)
        {
            ContaOrigem = saldo;
        }

        public void SetTransferirParaContaId(decimal saldo)
        {
           ContaDestino = saldo;
        }

        public void SetMensagem() /*criar mensagem de sucesso */
        {
            Mensagem = "Transferencia realizada com sucesso.";
        }
       
    }
}
