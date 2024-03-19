using Runpay.API.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domains.DTOs.Requests;

public class ClienteRequestDto {

    [Required(ErrorMessage = "O campo Nome � obrigat�rio.")]
    [MaxLength(250, ErrorMessage = "O campo Nome deve ter no m�ximo 250 caracteres.")]
    public string Nome { get; set; } = null!;

    [MaxLength(250, ErrorMessage = "O campo Nome Social deve ter no m�ximo 250 caracteres.")]
    public string? NomeSocial { get; set; }

    [Required(ErrorMessage = "O campo Data de Nascimento � obrigat�rio.")]
    [DataType(DataType.Date, ErrorMessage = "O campo Data de Nascimento deve ser uma data v�lida.")]
    [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
    public DateTime DataNascimento { get; set; }

    [Required(ErrorMessage = "O campo CPF � obrigat�rio.")]
    [RegularExpression(@"^\d{11}$", ErrorMessage = "O CPF deve conter 11 n�meros.")]
    public string Cpf { get; set; } = null!;

    [Required(ErrorMessage = "O campo RG � obrigat�rio.")]
    [RegularExpression(@"^\d+$", ErrorMessage = "Somente n�meros s�o permitidos no RG.")]
    public string Rg { get; set; } = null!;

    [Required(ErrorMessage = "O campo RgExpedidor � obrigat�rio.")]
    [MaxLength(100, ErrorMessage = "O campo Expedidor do RG deve ter no m�ximo 100 caracteres.")]
    public string RgExpedidor { get; set; } = null!;

    [Required(ErrorMessage = "O campo RgUF � obrigat�rio.")]
    [MaxLength(2, ErrorMessage = "O campo Unidade Federativa do RG deve ter no m�ximo 2 caracteres.")]
    public string RgUF { get; set; } = null!;

    [Required(ErrorMessage = "O campo Nacionalidade � obrigat�rio.")]
    [MaxLength(100, ErrorMessage = "O campo Nacionalidade deve ter no m�ximo 100 caracteres.")]
    public string Nacionalidade { get; set; } = null!;

    [Required(ErrorMessage = "O campo Estado Civil � obrigat�rio.")]
    public EEstadoCivil EstadoCivil { get; set; }

    [Required(ErrorMessage = "O campo Genero � obrigat�rio.")]
    public EGenero Genero { get; set; }

    [Required(ErrorMessage = "O campo DDD � obrigat�rio.")]
    public string Ddd { get; set; } = null!;

    [Required(ErrorMessage = "O campo Celular � obrigat�rio.")]
    [DataType(DataType.PhoneNumber, ErrorMessage = "O campo Celular deve ser um n�mero de telefone v�lido.")]
    public string Celular { get; set; } = null!;

    [Required(ErrorMessage = "O campo Email � obrigat�rio.")]
    [MaxLength(80, ErrorMessage = "O campo Email deve ter no m�ximo 80 caracteres.")]
    [EmailAddress(ErrorMessage = "O campo Email deve ser um endere�o de email v�lido.")]
    public string Email { get; set; } = null!;

    [Required]
    public EnderecoRequestDto Endereco {get; set;} = null!;
    [Required]
    public ContaRequestDto Conta { get; set;} = null!;
}