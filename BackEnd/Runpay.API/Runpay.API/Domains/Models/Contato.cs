namespace Runpay.API.Domains.Models;

public class Contato : Entity
{
    [Required(ErrorMessage = "O campo Nome é obrigatório.")]
    [MaxLength(250, ErrorMessage = "O campo Nome deve ter no máximo 250 caracteres.")]
    public string Nome { get; set; } = null!;

    [Required(ErrorMessage = "O campo Email é obrigatório.")]
    [MaxLength(80, ErrorMessage = "O campo Email deve ter no máximo 80 caracteres.")]
    [EmailAddress(ErrorMessage = "O campo Email deve ser um endereço de email válido.")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "O campo Celular é obrigatório.")]
    [DataType(DataType.PhoneNumber, ErrorMessage = "O campo Celular deve ser um número de telefone válido.")]
    public string Telefone { get; set; } = null!;

    [Required(ErrorMessage = "O campo CPF é obrigatório.")]
    [RegularExpression(@"^\d{11}$", ErrorMessage = "O CPF deve conter 11 números.")]
    public string Cpf { get; set; }
    public string Mensagem { get; set; } = null!;
    public bool EstaRespondido { get; set; } = false;
}
