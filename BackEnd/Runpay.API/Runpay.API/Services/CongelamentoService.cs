using Microsoft.Extensions.Caching.Memory;
using System;

namespace Runpay.API.Services
{
    public class CongelamentoService
    {
        private readonly IMemoryCache _cache;
        private const int MaxTentativasFalhadas = 3;
        private readonly TimeSpan DuracaoBloqueio = TimeSpan.FromMinutes(30);

        public CongelamentoService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public bool UsuarioBloqueado(string cpf)
        {
            if (_cache.TryGetValue(cpf, out TentativaLogin dadosTentativa))
            {
                if (dadosTentativa.Tentativas >= MaxTentativasFalhadas
                    && DateTime.UtcNow - dadosTentativa.UltimaTentativa <= DuracaoBloqueio)
                {
                    return true;
                }
            }
            return false;
        }

        public void RegistrarTentativaLoginFalhada(string cpf)
        {
            if (_cache.TryGetValue(cpf, out TentativaLogin dadosTentativa))
            {
                if (DateTime.UtcNow - dadosTentativa.UltimaTentativa > DuracaoBloqueio)
                {
                    dadosTentativa.Tentativas = 1;
                }
                else
                {
                    dadosTentativa.Tentativas++;
                }
                dadosTentativa.UltimaTentativa = DateTime.UtcNow;
                _cache.Set(cpf, dadosTentativa, DuracaoBloqueio);
            }
            else
            {
                _cache.Set(cpf, new TentativaLogin { Tentativas = 1, UltimaTentativa = DateTime.UtcNow }, DuracaoBloqueio);
            }
        }

        public void LimparTentativasLoginFalhadas(string cpf)
        {
            _cache.Remove(cpf);
        }
    }

    public class TentativaLogin
    {
        public int Tentativas { get; set; }
        public DateTime UltimaTentativa { get; set; }
    }
}
