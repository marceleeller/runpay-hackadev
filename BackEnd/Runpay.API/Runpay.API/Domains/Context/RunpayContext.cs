using Microsoft.EntityFrameworkCore;
using Runpay.API.Domain.Model;

namespace Runpay.API.Domains.Context
{
    public class RunpayContext:DbContext
    {
        public DbSet<Cliente> Clientes {get; set;}
        public DbSet<Conta> Contas {get; set;}
        public DbSet<Transacao> Transacoes {get; set;}
        public DbSet<Endereco> Enderecos {get; set;}
    
        public RunpayContext(DbContextOptions <RunpayContext> options) :base(options)
        {
        }
    }
}
