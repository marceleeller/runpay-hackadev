using AutoMapper;
using Runpay.API.Domain.Model;
using Runpay.API.Domains.DTOs.Requests;

namespace Runpay.API.Domains.Profiles;

public class ClienteProfile:Profile
{
    public ClienteProfile()
    {
        CreateMap<CadastrarClienteDto, Cliente>();
    }
    
}