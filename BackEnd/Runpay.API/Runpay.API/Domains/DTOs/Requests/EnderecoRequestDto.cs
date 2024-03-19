using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domains.DTOs.Requests;

public class EnderecoRequestDto {
    [Required(ErrorMessage = "O campo Rua � obrigat�rio.")]
    [MaxLength(100, ErrorMessage = "O campo Rua deve ter no m�ximo 100 caracteres.")]
    public string Rua { get; set; } = null!;

    [Required(ErrorMessage = "O campo N�mero � obrigat�rio.")]
    public string Numero { get; set; } = null!;

    [Required(ErrorMessage = "O campo Bairro � obrigat�rio.")]
    [MaxLength(100, ErrorMessage = "O campo Bairro deve ter no m�ximo 100 caracteres.")]
    public string Bairro { get; set; } = null!;

    [Required(ErrorMessage = "O campo Cidade � obrigat�rio.")]
    [MaxLength(100, ErrorMessage = "O campo Cidade deve ter no m�ximo 100 caracteres.")]
    public string Cidade { get; set; } = null!;

    [Required(ErrorMessage = "O campo Estado � obrigat�rio.")]
    [MaxLength(100, ErrorMessage = "O campo Estado deve ter no m�ximo 100 caracteres.")]
    public string Estado { get; set; } = null!;

    [Required(ErrorMessage = "O campo CEP � obrigat�rio.")]
    public string Cep { get; set; } = null!;

    [MaxLength(100, ErrorMessage = "O campo Complemento deve ter no m�ximo 100 caracteres.")]
    public string? Complemento { get; set; }
}