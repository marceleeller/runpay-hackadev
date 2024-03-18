namespace Runpay.API.Domains.Models;

public class Contato:Entity
{
    public string Nome { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Telefone { get; set; } = null!;
    public string Cpf { get; set; }
    public string Mensagem { get; set; } = null!;
    public bool EstaRespondido { get; set; } = false;
}
