namespace Runpay.API.Domains.DTOs.Requests
{
    public class TransferenciaRequest
   {
        public int TransferirDaContaId { get; set; }
        public int TransferirParaContaId { get; set; }
        public decimal ValorTransferencia { get; set; }
         public string? Mensagem { get; set; } /* para descrição opcional*/
   }
}