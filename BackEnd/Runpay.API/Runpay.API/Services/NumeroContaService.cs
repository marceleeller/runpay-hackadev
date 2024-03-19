using Microsoft.EntityFrameworkCore;
using Runpay.API.Domains.Context;

namespace Runpay.API.Services;

public class NumeroContaService
{
    private readonly RunpayDbContext _dbcontext;
    public NumeroContaService(RunpayDbContext dbContext)
    {
        _dbcontext = dbContext;
    }
    public string GerarNumeroConta()
    {
        var ultimoNumeroConta = _dbcontext.Contas.Max(c => c.NumeroConta);

        if (ultimoNumeroConta == null)
            return "1000000";

        return (int.Parse(ultimoNumeroConta) + 1).ToString();
    }
}
