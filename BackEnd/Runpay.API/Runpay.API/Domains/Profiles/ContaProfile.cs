﻿using AutoMapper;
using Runpay.API.Domain.Model;
using Runpay.API.Domains.DTOs.Requests;
using Runpay.API.Domains.DTOs.Responses;

namespace Runpay.API.Domains.Profiles;

public class ContaProfile : Profile
{
    public ContaProfile()
    {
        CreateMap<ContaRequestDto, Conta>()
            .ForMember(
                conta => conta.SenhaHash,
                opt => opt.MapFrom(contaRequestDto => contaRequestDto.Senha));
        CreateMap<Conta, ContaResponseDto>();
    }
}
