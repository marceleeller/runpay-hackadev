﻿using AutoMapper;
using DTOs.Requests;
using DTOs.Responses;
using Microsoft.AspNetCore.Mvc;
using Runpay.API.Domain.Model;

namespace Runpay.API.Domains.Profiles;
public class TransacaoProfile : Profile
{
    public TransacaoProfile()
    {
        CreateMap<Transacao, TransacaoResponseDto>()
            .ForMember(
            transacaoDto => transacaoDto.DataOperacao,
            opt => opt.MapFrom(transacao => transacao.CriadoEm));
        CreateMap<DepositoRequestDto, Transacao>();
        CreateMap<SaqueRequestDto, Transacao>();
    }
}
