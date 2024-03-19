using AutoMapper;
using Runpay.API.Domain.Model;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.DTOs.Responses;

namespace Runpay.API.Domains.Profiles;

public class ClienteProfile:Profile
{
    public ClienteProfile()
    {
        CreateMap<ClienteRequestDto, Cliente>();
        CreateMap<Cliente, ClienteResponseDto>();
    }

    public void TestMappingConfiguration()
    {
        var config = new MapperConfiguration(cfg => cfg.AddProfile<ClienteProfile>());
        config.AssertConfigurationIsValid();
    }

}