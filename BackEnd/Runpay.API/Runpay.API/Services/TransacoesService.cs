using AutoMapper;
using DTOs.Requests;
using DTOs.Responses;
using Microsoft.EntityFrameworkCore;
using Runpay.API.Domain.Enums;
using Runpay.API.Domain.Model;
using Runpay.API.Domains.Context;
using Runpay.API.Services.Interfaces;

namespace Runpay.API.Services;

public class TransacoesService : ITransacoesService
{

    private readonly RunpayDbContext _dbcontext;
    private readonly IMapper _mapper;

    public TransacoesService(RunpayDbContext dbcontext, IMapper mapper)
    {
        _dbcontext = dbcontext;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TransacaoResponseDto>> GetHistorico(long contaId)
    {
        var conta = await _dbcontext.Contas.FirstOrDefaultAsync(c => c.Id == contaId);

        if (conta == null)
            throw new Exception("Conta não encontrada");

        var listaTransacoes = await _dbcontext.Transacoes.Where(t => t.ContaId == conta.Id).ToListAsync();

        var response = listaTransacoes
            .Select(t => _mapper.Map<TransacaoResponseDto>(t))
            .OrderByDescending(t => t.DataOperacao);

        return response;
    }

    public async Task<TransacaoResponseDto> Deposito(long contaId, DepositoRequestDto request)
    {
        var contaDeposito = await _dbcontext.Contas.FirstAsync(c => c.Id == contaId);

        var adicionaSaldo = _mapper.Map<Transacao>(request);
        adicionaSaldo.ContaId = contaDeposito.Id;
        adicionaSaldo.Descricao = "Depósito em conta";
        adicionaSaldo.TipoTransacao = ETipoTransacao.Deposito;
        contaDeposito.Saldo += request.Valor;

        await _dbcontext.Transacoes.AddAsync(adicionaSaldo);
        await _dbcontext.SaveChangesAsync();

        return _mapper.Map<TransacaoResponseDto>(adicionaSaldo);
    }

    public async Task<TransacaoResponseDto> Saque(long contaId, SaqueRequestDto request)
    {
        var contaSaque = await _dbcontext.Contas.FirstOrDefaultAsync(c => c.Id == contaId);

        if (contaSaque == null)
            throw new Exception("Conta não encontrada");

        if (contaSaque.Saldo < request.Valor)
            throw new Exception("Saldo insuficiente.");

        var saque = _mapper.Map<Transacao>(request);
        saque.ContaId = contaSaque.Id;
        saque.Descricao = "Saque em conta";
        saque.TipoTransacao = ETipoTransacao.Saque;
        contaSaque.Saldo -= request.Valor;

        await _dbcontext.Transacoes.AddAsync(saque);
        await _dbcontext.SaveChangesAsync();

        return _mapper.Map<TransacaoResponseDto>(saque);
    }

    public async Task<TransacaoResponseDto> Transferencia(long contaId, TransferenciaRequestDto request)
    {
        var contaRemetente = await _dbcontext.Contas.Include(c => c.Cliente).FirstOrDefaultAsync(c => c.Id == contaId);
        var contaDestinatario = await _dbcontext.Contas.Include(c => c.Cliente).FirstOrDefaultAsync(c => c.NumeroConta == request.ContaDestinatario);

        if (contaRemetente == null || contaDestinatario == null)
            throw new Exception("Conta não encontrada");

        if (contaRemetente.Saldo < request.Valor)
            throw new Exception("Saldo insuficiente.");

        var transferenciaRemetente = new Transacao
        {
            ContaId = contaRemetente.Id,
            Descricao = "Para " + contaDestinatario.Cliente.Nome,
            Mensagem = request.Mensagem,
            TipoTransacao = ETipoTransacao.Transferencia,
            Valor = request.Valor
        };

        var transferenciaDestinatario = new Transacao
        {
            ContaId = contaDestinatario.Id,
            Descricao = "De " + contaRemetente.Cliente.Nome,
            Mensagem = request.Mensagem,
            TipoTransacao = ETipoTransacao.Transferencia,
            Valor = request.Valor
        };

        contaRemetente.Saldo -= request.Valor;
        contaDestinatario.Saldo += request.Valor;

        await _dbcontext.Transacoes.AddAsync(transferenciaRemetente);
        await _dbcontext.Transacoes.AddAsync(transferenciaDestinatario);

        await _dbcontext.SaveChangesAsync();

        return _mapper.Map<TransacaoResponseDto>(transferenciaRemetente);
    }
}
