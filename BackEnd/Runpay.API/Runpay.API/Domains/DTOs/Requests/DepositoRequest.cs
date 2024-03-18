namespace Runpay.API.Domains.DTOs.Requests
{
    public class DepositoRequest
    {
        public int ContaId { get; set; } 
        public decimal ValorDeposito { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public string? Mensagem { get; set; } /*descrição opcional do depósito*/
    
    }
}
