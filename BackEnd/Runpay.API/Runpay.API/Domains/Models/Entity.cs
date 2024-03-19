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
    [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy HH:mm:ss}", ApplyFormatInEditMode = true)]
    public DateTimeOffset CriadoEm { get; set; } = DateTimeOffset.Now;

    [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy HH:mm:ss}", ApplyFormatInEditMode = true)]
    public DateTimeOffset? AtualizadoEm { get; set; }

    [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy HH:mm:ss}", ApplyFormatInEditMode = true)]
    public DateTimeOffset? ExcluidoEm { get; set; }
}
