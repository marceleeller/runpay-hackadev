namespace Runpay.API.Domains.DTOs.Requests
{
    public class TransferenciaRequest
   {
        public int ContaOrigem { get; set; }
        public int ContaDestino { get; set; }
        public decimal ValorDeposito { get; set; }
        public decimal ValorTransferencia { get; set; }
         public string? Mensagem { get; set; } /* para descrição opcional*/
   }
}