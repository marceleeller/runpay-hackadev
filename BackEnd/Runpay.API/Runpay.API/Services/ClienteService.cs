using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Runpay.API.Domain.Model;
using Runpay.API.Domains.Context;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.DTOs.Responses;
using Runpay.API.Services.Interfaces;
using Runpay.API.Shared;

namespace Runpay.API.Services;

public class ClienteService : IClienteService
{
    private readonly RunpayDbContext _dbcontext;
    private readonly IMapper _mapper;

    public ClienteService(RunpayDbContext dbcontext, IMapper mapper)
    {
        _dbcontext = dbcontext;
        _mapper = mapper;
    }

    public async Task<ClienteResponseDto> GetCliente(int id)
    {
        var cliente = await _dbcontext.Clientes.Include(c => c.Conta).FirstOrDefaultAsync(n => n.Id == id);

        if (cliente == null)
            throw new ExceptionsType.NotFoundException("Cliente não encontrado");

        return _mapper.Map<ClienteResponseDto>(cliente);
    }

    public async Task<Cliente> Cadastrar(ClienteRequestDto novoCliente)
    {
        var clienteExiste = await _dbcontext.Clientes.AnyAsync(c => c.Cpf == novoCliente.Cpf);

        if (clienteExiste)
            throw new Exception("Cliente já cadastrado");

        if (novoCliente.Conta.Senha != novoCliente.Conta.ConfirmarSenha)
            throw new Exception("As senhas não conferem");

        Cliente clienteParaCadastro = _mapper.Map<Cliente>(novoCliente);

        clienteParaCadastro.Conta.NumeroConta = NumeroContaService.GerarNumeroConta(_dbcontext);

        await _dbcontext.Clientes.AddAsync(clienteParaCadastro);
        await _dbcontext.SaveChangesAsync();

        return clienteParaCadastro;
    }

    public async Task<ClienteResponseDto> Atualizar(AtualizaClienteRequestDto request, int id)
    {
        var cliente = await _dbcontext.Clientes.Include(c => c.Endereco).AsNoTracking().FirstOrDefaultAsync(n => n.Id == id);

        if (cliente == null)
            throw new ExceptionsType.NotFoundException("Cliente não encontrado");

        _mapper.Map(request.Endereco, cliente.Endereco);
        _mapper.Map(request, cliente);

        cliente.AtualizadoEm = DateTime.Now;
        cliente.Endereco.AtualizadoEm = DateTime.Now;

        _dbcontext.Clientes.Update(cliente);
        await _dbcontext.SaveChangesAsync();

        return _mapper.Map<ClienteResponseDto>(cliente);
    }

    public async Task<MessageResponse> Desativar(int id)
    {
        var cliente = await _dbcontext.Clientes.Include(c => c.Conta).FirstOrDefaultAsync(n => n.Id == id);

        if (cliente == null)
            throw new ExceptionsType.NotFoundException("Cliente não encontrado");

        if (cliente.Conta.StatusContaAtiva == false)
            throw new Exception("Cliente já desativado");

        if (cliente.Conta.Saldo > 0)
            throw new Exception("Cliente possui saldo em conta, não é possível desativar");

        cliente.Conta.StatusContaAtiva = false;
        cliente.Conta.AtualizadoEm = DateTime.Now;
        cliente.Conta.ExcluidoEm = DateTime.Now;

        _dbcontext.Clientes.Update(cliente);
        await _dbcontext.SaveChangesAsync();

        return new MessageResponse("Cliente desativado com sucesso");
    }

    public async Task<MessageResponse> Reativar(int id)
    {
        var cliente = await _dbcontext.Clientes.Include(c => c.Conta).FirstOrDefaultAsync(n => n.Id == id);

        if (cliente == null)
            throw new ExceptionsType.NotFoundException("Cliente não encontrado");

        if (cliente.Conta.StatusContaAtiva == true)
            throw new Exception("Cliente já está ativo");

        cliente.Conta.StatusContaAtiva = true;
        cliente.Conta.AtualizadoEm = DateTime.Now;

        _dbcontext.Clientes.Update(cliente);
        await _dbcontext.SaveChangesAsync();

        return new MessageResponse("Cliente reativado com sucesso");
    }

    public async Task<object> GetConta(string numeroConta)
    {
        var conta = await _dbcontext.Contas.Include(c => c.Cliente).FirstOrDefaultAsync(n => n.NumeroConta == numeroConta);

        if (conta == null)
            throw new ExceptionsType.NotFoundException("Conta não encontrada");

        var contaParaRetornar = new
        {
            numeroConta = conta.NumeroConta,
            nomeCliente = conta.Cliente.Nome
        };

        return contaParaRetornar;
    }

    public async Task<MessageResponse> PegarPorCpf(string cpf)
    {
        var cliente = await _dbcontext.Clientes.FirstOrDefaultAsync(n => n.Cpf == cpf);

        if (cliente != null)
            throw new Exception("Cliente já cadastrado");

        return new MessageResponse("CPF não utilizado");
    }
}
