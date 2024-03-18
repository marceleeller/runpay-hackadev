using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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

    // cadastra um novo cliente
    [HttpPost("cadastro")]
    public IActionResult Cadastrar(ClienteRequestDto novoCliente) {

        var clienteExiste = _dbcontext.Clientes.Any(c => c.Cpf == novoCliente.Cpf);

        if(clienteExiste)
            return BadRequest(new {message = "Cliente já cadastrado"});

        if (novoCliente.Conta.Senha != novoCliente.Conta.ConfirmarSenha)
            return BadRequest(new { message = "As senhas não conferem" });

        if (!ModelState.IsValid) return BadRequest(ModelState);

        novoCliente.Conta.Senha = CriptografiaService.GerarHash(novoCliente.Conta.Senha, CriptografiaService.GerarSalt(16));

        Cliente clienteParaCadastro = _mapper.Map<Cliente>(novoCliente);

        _dbcontext.Clientes.Add(clienteParaCadastro);
        _dbcontext.SaveChanges();

        var clienteParaRetornar = _mapper.Map<ClienteResponseDto>(clienteParaCadastro);

        return Ok(new { 
            message = "Cliente cadastrado com sucesso",
            cliente = clienteParaRetornar
        });
    }
}
