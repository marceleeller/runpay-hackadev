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

    // retornar cliente pelo Id
    [HttpGet("cliente/{id}")]
    [Authorize]
    [ProducesResponseType(typeof(ClienteResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult GetCliente(int id)
    {
        var cliente = _dbcontext.Clientes.Include(c => c.Conta).FirstOrDefault(n => n.Id == id);

        if (cliente == null)
            return NotFound(new { message = "Cliente n�o encontrado" });

        var clienteParaRetornar = _mapper.Map<ClienteResponseDto>(cliente);

        return Ok(new { clienteParaRetornar });
    }

    //retorna se numeroConta existe
    [HttpGet("conta/{numeroConta}")]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult GetConta(string numeroConta)
    {
        var conta = _dbcontext.Contas.Include(c => c.Cliente).FirstOrDefault(n => n.NumeroConta == numeroConta);

        if (conta == null)
            return NotFound(new { message = "Conta n�o encontrada" });

        var contaParaRetornar = new
        {
            numeroConta = conta.NumeroConta,
            nomeCliente = conta.Cliente.Nome
        };

        return Ok(new { contaParaRetornar });
    }

    //retorna se cpf ja foi cadastrado
    [HttpGet("{cpf}")]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult PegarPorCpf(string cpf)
    {
        var cliente = _dbcontext.Clientes.FirstOrDefault(n => n.Cpf == cpf);

        if (cliente != null)
            return BadRequest(new MessageResponse("Cliente j� cadastrado"));

        return Ok(new MessageResponse("CPF n�o utilizado"));
    }


    // cadastra um novo cliente
    [HttpPost("cadastro")]
    [ProducesResponseType(typeof(ClienteResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult Cadastrar(ClienteRequestDto novoCliente) {

        var clienteExiste = _dbcontext.Clientes.Any(c => c.Cpf == novoCliente.Cpf);

        if(clienteExiste)
            return BadRequest(new {message = "Cliente j� cadastrado"});

        if (novoCliente.Conta.Senha != novoCliente.Conta.ConfirmarSenha)
            return BadRequest(new { message = "As senhas n�o conferem" });

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

    // atualiza um cliente
    [HttpPut("atualizar")]
    [ProducesResponseType(typeof(ClienteResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult Atualizar(AtualizaClienteRequestDto request, int id)
    {
        var cliente = _dbcontext.Clientes.Include(c => c.Endereco).AsNoTracking().FirstOrDefault(n => n.Id == id);

        if (cliente == null)
            return NotFound(new { message = "Cliente n�o encontrado" });

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

    // desativa um cliente
    [HttpDelete("desativar")]
    [Authorize]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status400BadRequest)]
    public IActionResult Desativar(int id)
    {
        var cliente = _dbcontext.Clientes.Include(c => c.Conta).FirstOrDefault(n => n.Id == id);

        if (cliente == null)
            return NotFound(new { message = "Cliente n�o encontrado" });

        cliente.Conta.StatusContaAtiva = false;
        cliente.Conta.AtualizadoEm = DateTime.Now;

        _dbcontext.Clientes.Update(cliente);
        _dbcontext.SaveChanges();

        return Ok(new MessageResponse("Cliente desativado com sucesso"));
    }

}
