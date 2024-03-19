using System.Security.Cryptography;
using System.Text;

namespace Runpay.API.Services;

public static class CriptografiaService
{
    public static string GerarHash(this string valor)
    {
        using (var sha256 = SHA256.Create())
        {
            var inputBytes = Encoding.UTF8.GetBytes(valor);
            var hash = sha256.ComputeHash(inputBytes);
            return BitConverter.ToString(hash).Replace("-", "").ToLower();
        }
    }


    public static bool VerificarSenha(string senha, string hash)
    {
        return GerarHash(senha) == hash;
    }
}
