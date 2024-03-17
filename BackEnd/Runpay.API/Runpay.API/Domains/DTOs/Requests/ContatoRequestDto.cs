using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domains.DTOs.Requests;

public class ContatoRequestDto
{
    [Required(ErrorMessage = "Deve ser informado.")]
    public string Nome { get; set; } = null!;
    [Required(ErrorMessage = "Deve ser informado.")]
    public string Email { get; set; } = null!;
    [Required(ErrorMessage = "Deve ser informado.")]
    public string Telefone { get; set; } = null!;
    [Required(ErrorMessage = "Deve ser informado.")]
    public string Cpf { get; set; } = null!;

    [Required(ErrorMessage = "Deve ser informado.")]
    public string Mensagem { get; set; } = null!;
}
