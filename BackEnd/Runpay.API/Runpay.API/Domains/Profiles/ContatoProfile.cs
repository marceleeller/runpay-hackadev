using AutoMapper;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.Models;

namespace Runpay.API.Domains.Profiles;

public class ContatoProfile:Profile
{
    public ContatoProfile()
    {
        CreateMap<ContatoRequestDto, Contato>();
    }
    
}
