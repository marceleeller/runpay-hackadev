using Runpay.API.Domains.Models;

namespace Runpay.API.Services.Interfaces;

public interface IContatoService
{
    Task<Contato> Registrar(Contato contato);
    Task<Contato> GetContato(int id);
    Task<IEnumerable<Contato>> ListaContatos();
    Task<IEnumerable<Contato>> ListaContatosNaoRespondidos();
    Task<Contato> ResponderContato(int id);
    Task<Contato> DeletarContato(int id);

}
