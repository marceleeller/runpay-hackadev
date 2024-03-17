using System.ComponentModel.DataAnnotations;

namespace Runpay.API.Domains.Models;

interface IEntity
{
    public int Id { get; set; }
}
public abstract class Entity : IEntity
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    public DateTimeOffset CriadoEm { get; set; }

    public DateTimeOffset? AtualizadoEm { get; set; }

    public DateTimeOffset? ExcluidoEm { get; set; }
}
