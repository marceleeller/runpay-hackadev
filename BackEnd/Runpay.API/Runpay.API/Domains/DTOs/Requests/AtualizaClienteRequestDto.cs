using Runpay.API.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domains.DTOs.Requests;

public class AtualizaClienteRequestDto
{

    [Required(ErrorMessage = "O campo Nome é obrigatório.")]
    [MaxLength(250, ErrorMessage = "O campo Nome deve ter no máximo 250 caracteres.")]
    public string Nome { get; set; } = null!;

    [MaxLength(250, ErrorMessage = "O campo Nome Social deve ter no máximo 250 caracteres.")]
    public string? NomeSocial { get; set; }

    [Required(ErrorMessage = "O campo Data de Nascimento é obrigatório.")]
    [DataType(DataType.Date, ErrorMessage = "O campo Data de Nascimento deve ser uma data válida.")]
    [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
    public DateTime DataNascimento { get; set; }

    [Required(ErrorMessage = "O campo CPF é obrigatório.")]
    [RegularExpression(@"^\d{11}$", ErrorMessage = "O CPF deve conter 11 números.")]
    public string Cpf { get; set; } = null!;

    [Required(ErrorMessage = "O campo RG é obrigatório.")]
    [RegularExpression(@"^\d+$", ErrorMessage = "Somente números são permitidos no RG.")]
    public string Rg { get; set; } = null!;

    [Required(ErrorMessage = "O campo RgExpedidor é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O campo Expedidor do RG deve ter no máximo 100 caracteres.")]
    public string RgExpedidor { get; set; } = null!;

    [Required(ErrorMessage = "O campo RgUF é obrigatório.")]
    [MaxLength(2, ErrorMessage = "O campo Unidade Federativa do RG deve ter no máximo 2 caracteres.")]
    public string RgUF { get; set; } = null!;

    [Required(ErrorMessage = "O campo Nacionalidade é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O campo Nacionalidade deve ter no máximo 100 caracteres.")]
    public string Nacionalidade { get; set; } = null!;

    [Required(ErrorMessage = "O campo Estado Civil é obrigatório.")]
    public EEstadoCivil EstadoCivil { get; set; }

    [Required(ErrorMessage = "O campo Genero é obrigatório.")]
    public EGenero Genero { get; set; }

    [Required(ErrorMessage = "O campo DDD é obrigatório.")]
    public string Ddd { get; set; } = null!;

    [Required(ErrorMessage = "O campo Celular é obrigatório.")]
    [DataType(DataType.PhoneNumber, ErrorMessage = "O campo Celular deve ser um número de telefone válido.")]
    public string Celular { get; set; } = null!;

    [Required(ErrorMessage = "O campo Email é obrigatório.")]
    [MaxLength(80, ErrorMessage = "O campo Email deve ter no máximo 80 caracteres.")]
    [EmailAddress(ErrorMessage = "O campo Email deve ser um endereço de email válido.")]
    public string Email { get; set; } = null!;

    [Required]
    public EnderecoRequestDto Endereco { get; set; } = null!;

}
