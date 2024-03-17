using Microsoft.EntityFrameworkCore;
using Runpay.API.Domain.Model;
using Runpay.API.Domains.Models;

namespace Runpay.API.Domains.Context
{
    public class RunpayDbContext:DbContext
    {
        public RunpayDbContext(DbContextOptions<RunpayDbContext> options) : base(options)
        {
        }

        public DbSet<Cliente> Clientes {get; set;}
        public DbSet<Conta> Contas {get; set;}
        public DbSet<Transacao> Transacoes {get; set;}
        public DbSet<Endereco> Enderecos {get; set;}
        public DbSet<Contato> Contatos { get; set; }


    }
}
