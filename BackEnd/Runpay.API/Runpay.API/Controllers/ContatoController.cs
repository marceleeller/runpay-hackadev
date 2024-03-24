using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Runpay.API.Domains.Context;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.DTOs.Responses;
using Runpay.API.Domains.Models;
using Runpay.API.Services.Interfaces;
using Runpay.API.Shared;

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
    /// <summary>
    /// Registra um novo formulário de contato.
    /// </summary>
    /// <param name="contatoRequest">Formulário de contato a ser registrado</param>
    /// <returns>Resultado do registro</returns>
    /// <response code="200">Formulário de contato enviado com sucesso</response>
    [HttpPost]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> Registrar(ContatoRequestDto contatoRequest)
    {
        Contato contato = _mapper.Map<Contato>(contatoRequest);
        await _contatoService.Registrar(contato);
        return Ok("Formulário de contato enviado com sucesso");
    }

    /// <summary>
    /// Retorna lista de formulários de contato
    /// </summary>
    /// <returns>Lista de formulários de contato</returns>
    /// <response code="200">Retorna o histórico de todos formulários de contato</response>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Contato>), StatusCodes.Status200OK)]
    public async Task<IActionResult> ListaContatos()
    {
        var contacts = await _contatoService.ListaContatos();
        return Ok(contacts);
    }

    /// <summary>
    /// Retorna um formulário de contato pelo id.
    /// </summary>
    /// <param name="id">Id do formulário de contato a ser retornado</param>
    /// <returns>Um formulário de contato pelo id</returns>
    /// <response code="200">Retorna um formulário de contato pelo id</response>
    /// <response code="404">Formulário de contato nao encontrado</response>
    /// <response code="400">Formulário de contato excluído</response>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Contato), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetContato(int id)
    {
        try
        {
            var contato = await _contatoService.GetContato(id);
            
            return Ok(contato);
        }
        catch (ExceptionsType.NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Retorna lista de formulários de contato não respondidos
    /// </summary>
    /// <returns>Lista de formulários de contato não respondidos</returns>
    /// <response code="200">Retorna o histórico de todos formulários de contato não respondidos</response>
    [HttpGet("nao-respondidos")]
    [ProducesResponseType(typeof(IEnumerable<Contato>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetNaoRespondidos()
    {
        var contatos = await _contatoService.ListaContatosNaoRespondidos();
        return Ok(contatos);
    }

    /// <summary>
    /// Atualiza o status de um formulário de contato para respondido.
    /// </summary>
    /// <param name="id">Id do formulário de contato a ser respondido</param>
    /// <returns>Um formulário de contato pelo id</returns>
    /// <response code="200">Marca um formulário como respondido</response>
    /// <response code="404">Formulário de contato nao encontrado</response>
    /// <response code="400">Formulário de contato já respondido</response>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> MarcarComoRespondido(int id)
    {
        try
        {
            var contato = await _contatoService.ResponderContato(id);
            return Ok("Formulário respondido com sucesso!");
        }
        catch (ExceptionsType.NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Deleta um formulário de contato.
    /// </summary>
    /// <param name="id">Id do formulário de contato a ser deletado</param>
    /// <returns>Um formulário de contato pelo id</returns>
    /// <response code="200">Formulário de contato deletado</response>
    /// <response code="404">Formulário de contato nao encontrado</response>
    /// <response code="400">Ocorreu um erro ao processar a solicitação</response>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeletarContato(int id)
    {
        try
        {
            var contato = await _contatoService.GetContato(id);

            await _contatoService.DeletarContato(id);
            return Ok("Formulário de contato deletado");
        }
        catch (ExceptionsType.NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


}
