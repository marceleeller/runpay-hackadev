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

namespace Runpay.API.Controllers;

[ApiController]
[Route("api/clientes")]
public class ClienteController : ControllerBase
{
    private readonly RunpayDbContext _dbcontext;
    private readonly IMapper _mapper;

    public ClienteController(RunpayDbContext dbcontext, IMapper mapper)
    {
        _dbcontext = dbcontext;
        _mapper = mapper;
    }

     /// <summary>
     /// Retorna se número da conta existe.
     /// </summary>
     /// <param name="numeroConta">Numero da Conta</param>
     /// <returns>O numero da conta e o nome do cliente associado</returns>
     /// <response code="200">O numero da conta existe</response>
    /// <response code="400">Conta não encontrada</response>
    [HttpGet("conta/{numeroConta}")]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult GetConta(string numeroConta)
    {
        var conta = _dbcontext.Contas.Include(c => c.Cliente).FirstOrDefault(n => n.NumeroConta == numeroConta);

        if (conta == null)
            return NotFound(new { message = "Conta não encontrada" });

        var contaParaRetornar = new
        {
            numeroConta = conta.NumeroConta,
            nomeCliente = conta.Cliente.Nome
        };

        return Ok(new { contaParaRetornar });
    }

    /// <summary>
    /// Verificar se cpf já foi cadastrado.
    /// </summary>
    /// <param name="cpf">CPF a ser verificado</param>
    /// <returns>Mensagem informando se o CPF está diponível ou não</returns>
    /// <response code="200">Cliente já cadastrado</response>
    /// <response code="400">CPF não utilizado</response>
    [HttpGet("{cpf}")]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult PegarPorCpf(string cpf)
    {
        var cliente = _dbcontext.Clientes.FirstOrDefault(n => n.Cpf == cpf);

        if (cliente != null)
            return BadRequest(new MessageResponse("Cliente já cadastrado"));

        return Ok(new MessageResponse("CPF não utilizado"));
    }

    /// <summary>
    /// Retorna o cliente pelo Id.
    /// </summary>
    /// <param name="id">Id do cliente</param>
    /// <returns>O cliente correspondente ao id fornecido</returns>
    /// <response code="200">Cliente cadastrado com o id informado</response>
    /// <response code="400">Cliente não encontrado</response>
    [HttpGet("cliente/{id}")]
    [Authorize]
    [ProducesResponseType(typeof(ClienteResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult GetCliente(int id)
    {
        var cliente = _dbcontext.Clientes.Include(c => c.Conta).FirstOrDefault(n => n.Id == id);

        if (cliente == null)
            return NotFound(new { message = "Cliente não encontrado" });

        var clienteParaRetornar = _mapper.Map<ClienteResponseDto>(cliente);

        return Ok(new { clienteParaRetornar });
    }
    /// <summary>
    /// Cadastrar um novo cliente.
    /// </summary>
    /// <param name="novoCliente">Novo cliente a ser cadastrado</param>
    /// <returns>Cadastro do novo cliente</returns>
    /// <response code="201">Cliente cadastrado com sucesso!</response>
    /// <response code="400">Cliente já cadastrado</response>
    [HttpPost("cadastro")]
    [ProducesResponseType(typeof(ClienteResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult Cadastrar(ClienteRequestDto novoCliente)
    {

        var clienteExiste = _dbcontext.Clientes.Any(c => c.Cpf == novoCliente.Cpf);

        if (clienteExiste)
            return BadRequest(new { message = "Cliente já cadastrado" });

        if (novoCliente.Conta.Senha != novoCliente.Conta.ConfirmarSenha)
            return BadRequest(new { message = "As senhas não conferem" });

        if (!ModelState.IsValid) return BadRequest(ModelState);

        Cliente clienteParaCadastro = _mapper.Map<Cliente>(novoCliente);

        clienteParaCadastro.Conta.NumeroConta = NumeroContaService.GerarNumeroConta(_dbcontext);

        _dbcontext.Clientes.Add(clienteParaCadastro);
        _dbcontext.SaveChanges();

        var clienteParaRetornar = _mapper.Map<ClienteResponseDto>(clienteParaCadastro);

        return CreatedAtAction(
        nameof(GetCliente),
        new { id = clienteParaCadastro.Id },
        new
        {
            message = new MessageResponse("Cliente cadastrado com sucesso"),
            cliente = clienteParaRetornar
        }
    );
    }
    /// <summary>
    /// Atualizar um cliente.
    /// </summary>
    /// <param name="request">Dados de atualização do cliente</param>
    /// <param name="id">Id do cliente a ser atualizado</param>
    /// <response code="200">Cliente atualizado com sucesso!</response>
    /// <response code="400">Cliente não encontrado</response>
    [HttpPut("atualizar")]
    [ProducesResponseType(typeof(ClienteResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult Atualizar(AtualizaClienteRequestDto request, int id)
    {
        var cliente = _dbcontext.Clientes.Include(c => c.Endereco).AsNoTracking().FirstOrDefault(n => n.Id == id);

        if (cliente == null)
            return NotFound(new { message = "Cliente não encontrado" });

        _mapper.Map(request.Endereco, cliente.Endereco);
        _mapper.Map(request, cliente);

        cliente.AtualizadoEm = DateTime.Now;
        cliente.Endereco.AtualizadoEm = DateTime.Now;

        _dbcontext.Clientes.Update(cliente);
        _dbcontext.SaveChanges();

        var clienteParaRetornar = _mapper.Map<ClienteResponseDto>(cliente);

        return Ok(new
        {
            message = new MessageResponse("Cliente atualizado com sucesso"),
            cliente = clienteParaRetornar
        });
    }
    /// <summary>
    /// Desativar um cliente.
    /// </summary>
    /// <param name="id">Id do cliente</param>
    /// <response code="200">Cliente desativado com sucesso!</response>
    /// <response code="400">Cliente não encontrado</response>
    [HttpDelete("desativar")]
    [Authorize]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult Desativar(int id)
    {
        var cliente = _dbcontext.Clientes.Include(c => c.Conta).FirstOrDefault(n => n.Id == id);

        if (cliente == null)
            return NotFound(new { message = "Cliente não encontrado" });

        cliente.Conta.StatusContaAtiva = false;
        cliente.Conta.AtualizadoEm = DateTime.Now;

        _dbcontext.Clientes.Update(cliente);
        _dbcontext.SaveChanges();

        return Ok(new MessageResponse("Cliente desativado com sucesso"));
    }
    
}

