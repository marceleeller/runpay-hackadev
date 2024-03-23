using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Runpay.API.Domain.Model;
using Runpay.API.Domains.Context;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.DTOs.Responses;
using Runpay.API.Services;
using Runpay.API.Services.Interfaces;
using static Runpay.API.Services.ClienteService;


namespace Runpay.API.Controllers;

[ApiController]
[Route("api/clientes")]
public class ClienteController : ControllerBase
{
    private readonly RunpayDbContext _dbcontext;
    private readonly IMapper _mapper;
    private readonly IClienteService _clienteService;

    public ClienteController(RunpayDbContext dbcontext, IMapper mapper, IClienteService clienteService)
    {
        _dbcontext = dbcontext;
        _mapper = mapper;
        _clienteService = clienteService;
    }

    /// <summary>
    /// Retorna o cliente pelo id.
    /// </summary>
    /// <param name="id">Id do cliente</param>
    /// <returns>O cliente pelo id</returns>
    /// <response code="200">Retorna o cliente cadastrado com o id informado</response>
    /// <response code="400">Cliente não encontrado</response>
    [HttpGet]
    [Authorize]
    [ProducesResponseType(typeof(ClienteResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCliente()
    {
        var contaIdClaim = User.FindFirst("ContaId");
        if (contaIdClaim == null) return NotFound("Conta não encontrada");
        var id = int.Parse(contaIdClaim.Value);

        try
        {
            var clienteParaRetornar = await _clienteService.GetCliente(id);
            return Ok(new { clienteParaRetornar });
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    // cadastra um novo cliente
    [HttpPost("cadastro")]
    [ProducesResponseType(typeof(ClienteResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Cadastrar(ClienteRequestDto novoCliente)
    {

        try
        {
            var clienteParaCadastro = await _clienteService.Cadastrar(novoCliente);
            var clienteParaRetornar = _mapper.Map<ClienteResponseDto>(clienteParaCadastro);

            return CreatedAtAction(
                nameof(GetCliente),
                new { id = clienteParaCadastro.Id },
                new
                {
                    message = "Cliente cadastrado com sucesso",
                    cliente = clienteParaRetornar
                }
            );
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // atualiza um cliente
    [HttpPut("atualizar")]
    [ProducesResponseType(typeof(ClienteResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Atualizar(AtualizaClienteRequestDto request)
    {

        var contaIdClaim = User.FindFirst("ContaId");
        if (contaIdClaim == null) return NotFound("Conta não encontrada");
        var id = int.Parse(contaIdClaim.Value);

        try
        {
            var clienteParaRetornar = await _clienteService.Atualizar(request, id);
            return Ok(new
            {
                message = ("Cliente atualizado com sucesso"),
                cliente = clienteParaRetornar
            });
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    // desativa um cliente
    [HttpDelete("desativar")]
    [Authorize]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Desativar()
    {
        var contaIdClaim = User.FindFirst("ContaId");
        if (contaIdClaim == null) return NotFound("Conta não encontrada");
        var id = int.Parse(contaIdClaim.Value);

        try
        {
            var message = await _clienteService.Desativar(id);
            return Ok(message);
        }
        catch (NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (BadRequestException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // validacoes

    //retorna se numeroConta existe
    [HttpGet("conta/{numeroConta}")]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetConta(string numeroConta)
    {
        try
        {
            var contaParaRetornar = await _clienteService.GetConta(numeroConta);
            return Ok(contaParaRetornar);
        }
        catch (NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

    //retorna se cpf ja foi cadastrado
    [HttpGet("{cpf}")]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> PegarPorCpf(string cpf)
    {
        try
        {
            var message = await _clienteService.PegarPorCpf(cpf);
            return Ok(message);
        }
        catch (BadRequestException ex)
        {
            return BadRequest(new MessageResponse(ex.Message));
        }
    }

}
