using Runpay.API.Domain.Enums;

namespace DTOs.Responses
{
    public class TransferenciaResponseDto
    {
        public long Id { get; set; }
        public string Descricao { get; set; } = null!;
        public string? Mensagem { get; set; }
        public decimal Valor { get; set; }
        public ETipoTransacao TipoTransacao { get; set; }
        public DateTimeOffset DataOperacao { get; set; }


    }
}
