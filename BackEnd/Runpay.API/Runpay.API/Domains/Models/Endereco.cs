using Runpay.API.Domains.Models;

namespace Runpay.API.Domain.Model;

public class Endereco : Entity
{
    [Required(ErrorMessage = "O campo Rua é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O campo Rua deve ter no máximo 100 caracteres.")]
    public string Rua { get; set; } = null!;

    [Required(ErrorMessage = "O campo Número é obrigatório.")]
    public int Numero { get; set; }

    [Required(ErrorMessage = "O campo Bairro é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O campo Bairro deve ter no máximo 100 caracteres.")]
    public string Bairro { get; set; } = null!;

    [Required(ErrorMessage = "O campo Cidade é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O campo Cidade deve ter no máximo 100 caracteres.")]
    public string Cidade { get; set; } = null!;

    [Required(ErrorMessage = "O campo Estado é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O campo Estado deve ter no máximo 100 caracteres.")]
    public string Estado { get; set; } = null!;

    [Required(ErrorMessage = "O campo CEP é obrigatório.")]
    public string Cep { get; set; } = null!;

    [MaxLength(100, ErrorMessage = "O campo Complemento deve ter no máximo 100 caracteres.")]
    public string? Complemento { get; set; }

}
