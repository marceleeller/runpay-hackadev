using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Runpay.API.Domains.Context;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.DTOs.Responses;
using Runpay.API.Domains.Models;
using Runpay.API.Services.Interfaces;

namespace Runpay.API.Controllers;

[ApiController]
[Route("api/contato")]
public class ContatoController : ControllerBase
{
    private readonly RunpayDbContext _dbcontext;
    private readonly IMapper _mapper;
    private readonly IContatoService _contatoService;

    public ContatoController(RunpayDbContext dbcontext, IMapper mapper, IContatoService contatoService)
    {
        _dbcontext = dbcontext;
        _mapper = mapper;
        _contatoService = contatoService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> Registrar(ContatoRequestDto contatoRequest)
    {
        Contato contato = _mapper.Map<Contato>(contatoRequest);
        await _contatoService.Registrar(contato);
        return Ok("Formulário de contato enviado com sucesso");
    }



    // retorna lista de contatos
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Contato>), StatusCodes.Status200OK)]
    public async Task<IActionResult> ListaContatos()
    {
        var contacts = await _contatoService.ListaContatos();
        return Ok(contacts);
    }

    // retorna lsita de contatos nao respondidos
    [HttpGet("nao-respondidos")]
    [ProducesResponseType(typeof(IEnumerable<Contato>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetNaoRespondidos()
    {
        var contatos = await _contatoService.ListaContatosNaoRespondidos();
        return Ok(contatos);
    }

    // responde um contato
    [HttpPut("responder")]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> MarcarComoRespondido(int id)
    {
        var contato = await _contatoService.ResponderContato(id);
        return Ok("Formulário respondido com sucesso!");
    }




}
