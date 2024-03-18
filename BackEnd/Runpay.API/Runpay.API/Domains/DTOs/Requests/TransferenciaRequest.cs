namespace DTOs.Requests
{
    public class TransferenciaRequest
   {
        public int AccountFromId { get; set; }
        public int AccountToId { get; set; }
        public decimal Amount { get; set; }
         public string? Mensagem { get; set; } /* para descrição opcional*/
   }
}