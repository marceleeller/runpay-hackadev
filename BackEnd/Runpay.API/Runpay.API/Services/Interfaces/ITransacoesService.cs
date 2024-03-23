using DTOs.Requests;
using DTOs.Responses;

namespace Runpay.API.Services.Interfaces;

public interface ITransacoesService
{
    Task<IEnumerable<TransacaoResponseDto>> GetHistorico(long contaId);
    Task<TransacaoResponseDto> Deposito(long contaId, DepositoRequestDto request);
    Task<TransacaoResponseDto> Saque(long contaId, SaqueRequestDto request);
    Task<TransacaoResponseDto> Transferencia(long contaId, TransferenciaRequestDto request);

}

