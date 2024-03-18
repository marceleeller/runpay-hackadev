using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Runpay.API.Domain.Model;
using Runpay.API.Domains.Context;
using Runpay.API.Domains.DTOs.Requests;


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

    [HttpGet]
    public IActionResult ListarClientes() {
        var cliente = _dbcontext.Clientes.ToList();
        return Ok(cliente);
    }

    [HttpGet("{id}")]
    public IActionResult BuscaCliente(int id) {
        var cliente = _dbcontext.Clientes.Find(id);
        if (BuscaCliente == null) {
            return NotFound();
        }

        return Ok(cliente);
    }


    [HttpPost("cadastro")]

    public IActionResult Cadastrar(CadastrarClienteDto novoCliente) {

        var clienteParaCadastro = _mapper.Map<Cliente>(novoCliente);

        var result = _dbcontext.Clientes.Add(clienteParaCadastro);
        _dbcontext.SaveChanges();
        var clienteCadastrado = result.Entity;

        return CreatedAtAction(nameof(BuscaCliente), new{clienteCadastrado.Id}, clienteCadastrado);

    }

}
