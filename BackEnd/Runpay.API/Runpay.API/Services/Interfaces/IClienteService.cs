using Runpay.API.Domain.Model;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.DTOs.Responses;

namespace Runpay.API.Services.Interfaces;

public interface IClienteService
{
    Task<ClienteResponseDto> GetCliente(int id);
    Task<Cliente> Cadastrar(ClienteRequestDto novoCliente);
    Task<ClienteResponseDto> Atualizar(AtualizaClienteRequestDto request, int id);
    Task<MessageResponse> Desativar(int id);
    Task<object> GetConta(string numeroConta);
    Task<MessageResponse> PegarPorCpf(string cpf);



}
