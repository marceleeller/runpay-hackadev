using Runpay.API.Domain.Enums;
using Runpay.API.Domains.Models;
using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domain.Model;

public class Cliente : Entity
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

    [MaxLength(100, ErrorMessage = "O campo Expedidor do RG deve ter no máximo 100 caracteres.")]

    public string RgExpedidor { get; set; } = null!;

    [MaxLength(2, ErrorMessage = "O campo Unidade Federativa do RG deve ter no máximo 2 caracteres.")]
    public string RgUF { get; set; } = null!;

    [Required(ErrorMessage = "O campo Nacionalidade é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O campo Nacionalidade deve ter no máximo 100 caracteres.")]
    public string Nacionalidade { get; set; } = null!;

    [Required(ErrorMessage = "O campo Estado Civil é obrigatório.")]
    public EEstadoCivil EstadoCivil { get; set; }

    public EGenero Genero { get; set; }

    [Required(ErrorMessage = "O campo DDD é obrigatório.")]
    public int Ddd { get; set; }

    [Required(ErrorMessage = "O campo Celular é obrigatório.")]
    [DataType(DataType.PhoneNumber, ErrorMessage = "O campo Celular deve ser um número de telefone válido.")]
    public string Celular { get; set; } = null!;

    [Required(ErrorMessage = "O campo Email é obrigatório.")]
    [MaxLength(80, ErrorMessage = "O campo Email deve ter no máximo 80 caracteres.")]
    [EmailAddress(ErrorMessage = "O campo Email deve ser um endereço de email válido.")]
    public string Email { get; set; } = null!;
    public Conta Conta { get; set; } = null!;

    public int? EnderecoId { get; set; }
    public virtual Endereco Endereco { get; set; } = null!;

}
