using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Runpay.API.Domains.Context;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.Models;

namespace Runpay.API.Controllers;

[ApiController]
[Route("api/contato")]
public class ContatoController : ControllerBase
{
    private readonly RunpayDbContext _dbcontext;
    private readonly IMapper _mapper;

    public ContatoController(RunpayDbContext dbcontext, IMapper mapper)
    {
        _dbcontext = dbcontext;
        _mapper = mapper;
    }

    [HttpPost]
    public IActionResult Registrar(ContatoRequestDto contatoRequest)
    {
        Contato contato = _mapper.Map<Contato>(contatoRequest);

        _dbcontext.Contatos.Add(contato);
        _dbcontext.SaveChanges();
        return Ok("Formulário de contato enviado!");
    }
}
