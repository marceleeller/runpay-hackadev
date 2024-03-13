using Runpay.API.Domain.Enums;

namespace Runpay.API.Domain.Model;

public class Transacao
{
    public int IdTransacao { get; set; }
    public string ContaDestinatario { get; set; } = null!;
    public string NomeDestinatario { get; set; } = null!;
    public string? Descricao { get; set; }
    public decimal? Valor { get; set; } = null!;
    public DateTime? DataHoraTrans { get; set; } = null!;
    public ETipoTransacao TipoTransacao { get; set; }
}
