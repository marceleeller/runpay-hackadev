namespace Runpay.API.Domains.DTOs.Responses
{
    public class HistoricoResponse
    {
        public int Id { get; set; }
        public int ContaId { get; set; }
        public string? Descricao { get; set; }
        public string Historico { get; set; } = null!;
        public decimal Valor { get; set; }
       
    }


}
