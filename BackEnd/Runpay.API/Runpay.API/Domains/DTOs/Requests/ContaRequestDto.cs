using Microsoft.AspNetCore.Mvc;
using Runpay.API.Services;
using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domains.DTOs.Requests;
public class ContaRequestDto
{
    [Required]
    public string Senha { get; set; } = null!;
    [Required]
    public string ConfirmarSenha { get; set; } = null!;

}
