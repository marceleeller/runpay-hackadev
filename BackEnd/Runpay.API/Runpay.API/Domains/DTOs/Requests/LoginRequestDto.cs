using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domains.DTOs.Requests;

public class LoginRequestDto
{
    [Required(ErrorMessage = "O CPF é obrigatório")]
    public string Cpf { get; set; } = null!;

    [Required(ErrorMessage = "A senha é obrigatória")]
    public string Senha { get; set; } = null!;
}
