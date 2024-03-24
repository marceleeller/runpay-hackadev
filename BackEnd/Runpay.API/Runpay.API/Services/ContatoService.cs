﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Runpay.API.Domains.Context;
using Runpay.API.Domains.Models;
using Runpay.API.Services.Interfaces;

namespace Runpay.API.Services;


public class ContatoService : IContatoService
{

    private readonly RunpayDbContext _dbcontext;
    private readonly IMapper _mapper;

    public ContatoService(RunpayDbContext dbcontext, IMapper mapper)
    {
        _dbcontext = dbcontext;
        _mapper = mapper;
    }

    public async Task<Contato> Registrar(Contato contato)
    {
        _dbcontext.Contatos.Add(contato);
        await _dbcontext.SaveChangesAsync();
        return contato;
    }

    public async Task<IEnumerable<Contato>> ListaContatos()
    {
        var contatos = await _dbcontext.Contatos.ToListAsync();
        return contatos
            .OrderByDescending(c => c.CriadoEm.UtcDateTime);
    }

    public async Task<IEnumerable<Contato>> ListaContatosNaoRespondidos()
    {

        var contatos = await _dbcontext.Contatos.ToListAsync();
        return contatos
            .Where(c => !c.EstaRespondido)
            .OrderByDescending(c => c.CriadoEm.UtcDateTime);

    }

    public async Task<Contato> ResponderContato(int id)
    {
        var contato = await _dbcontext.Contatos.FindAsync(id);
        if (contato == null) throw new Exception("Contato não encontrado");
        if (contato.EstaRespondido) throw new Exception("Contato já respondido");

        contato.EstaRespondido = true;
        contato.AtualizadoEm = DateTimeOffset.Now;
        await _dbcontext.SaveChangesAsync();
        return contato;
    }


}
