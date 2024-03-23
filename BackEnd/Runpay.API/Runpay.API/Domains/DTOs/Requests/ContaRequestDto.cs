using Microsoft.AspNetCore.Mvc;
using Runpay.API.Services;
using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domains.DTOs.Requests;
public class ContaRequestDto
{
    [Required]
    [DataType(DataType.Password)]
    public string Senha { get; set; } = null!;
    [Required]
    [Compare("Senha", ErrorMessage = "As senhas não conferem.")]
    public string ConfirmarSenha { get; set; } = null!;

}
