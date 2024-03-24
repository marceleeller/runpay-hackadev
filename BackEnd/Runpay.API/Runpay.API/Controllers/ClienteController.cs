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
using Runpay.API.Shared;
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
    /// Retorna o cliente logado.
    /// </summary>
    /// <returns>O cliente logado</returns>
    /// <response code="200">Retorna os dados do cliente logado</response>
    /// <response code="404">Cliente nao encontrado</response>
    [HttpGet]
    [Authorize]
    [ProducesResponseType(typeof(ClienteResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCliente()
    {
        var contaIdClaim = User.FindFirst("ContaId");
        if (contaIdClaim == null) return NotFound("Conta nao encontrada");
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

    /// <summary>
    /// Cadastrar novo cliente.
    /// </summary>
    /// <param name="novoCliente">Formulário de cadastro</param>
    /// <returns>Cadastro do novo cliente</returns>
    /// <response code="201">Cliente cadastrado com sucesso</response>
    /// <response code="400">Cliente já cadastrado</response>
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

    /// <summary>
    /// Atualizar um cliente.
    /// </summary>
    /// <param name="request">Os dados da atualização do cliente</param>
    /// <returns>Resultado da atualização</returns>
    /// <response code="200">Cliente atualizado com sucesso</response>
    /// <response code="404">Conta nao encontrada</response>
    [HttpPut("atualizar")]
    [ProducesResponseType(typeof(ClienteResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Atualizar(AtualizaClienteRequestDto request)
    {

        var contaIdClaim = User.FindFirst("ContaId");
        if (contaIdClaim == null) return NotFound("Conta nao encontrada");
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

    /// <summary>
    /// Desativar um cliente.
    /// </summary>
    /// <returns>Retorna o resultado da desativação</returns>
    /// <response code="200">O cliente foi desativado com sucesso</response>
    /// <response code="400">Cliente já desativado ou possui saldo em conta</response>
    /// <response code="404">Conta não encontrada</response>
    [HttpDelete("desativar")]
    [Authorize]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Desativar()
    {
        var contaIdClaim = User.FindFirst("ContaId");
        if (contaIdClaim == null) return NotFound("Conta nao encontrada");
        var id = int.Parse(contaIdClaim.Value);

        try
        {
            var message = await _clienteService.Desativar(id);
            return Ok(message);
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
    /// Reativa um cliente.
    /// </summary>
    /// <returns>Retorna o resultado da reativação</returns>
    /// <response code="200">O cliente foi ativado com sucesso</response>
    /// <response code="400">Cliente já está ativo</response>
    /// <response code="404">Conta não encontrada</response>
    [HttpPut("reativar/{id}")]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Reativar(int id)
    {
        try
        {
            var message = await _clienteService.Reativar(id);
            return Ok(message);
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

    // validacoes

    /// <summary>
    /// Retorna se o número da conta existe.
    /// </summary>
    /// <param name="numeroConta">O número da conta para buscar informações</param>
    /// <returns>Informações da conta</returns>
    /// <response code="200">Conta encontrada com sucesso</response>
    /// <response code="404">Conta não encontrada</response>
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
        catch (ExceptionsType.NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

    /// <summary>
    /// Retorna se cpf já foi cadastrado.
    /// </summary>
    /// <param name="cpf">O CPF a ser verificado</param>
    /// <returns>Retorna se o CPF já foi cadastrado ou não</returns>
    /// <response code="200">O CPF já foi cadastrado</response>
    /// <response code="400">CPF fornecido é inválido</response>
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
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}
