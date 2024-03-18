using Runpay.API.Domain.Enums;
using Runpay.API.Domains.Models;
using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domain.Model;

public class Cliente : Entity
{
    public string Nome { get; set; } = null!;
    public string? NomeSocial { get; set; }
    public DateTime DataNascimento { get; set; }
    public string Cpf { get; set; } = null!;
    public string Rg { get; set; } = null!;
    public string RgExpedidor { get; set; } = null!;
    public string RgUF { get; set; } = null!;
    public string Nacionalidade { get; set; } = null!;
    public EEstadoCivil EstadoCivil { get; set; }
    public EGenero Genero { get; set; }
    public string Ddd { get; set; } = null!;
    public string Celular { get; set; } = null!;
    public string Email { get; set; } = null!;

    public Conta Conta { get; set; } = null!;

    public int? EnderecoId { get; set; }
    public virtual Endereco Endereco { get; set; } = null!;

}
