using System.Security.Cryptography;
using System.Text;

namespace Runpay.API.Services;

public static class CriptografiaService
{
    public static string GerarHash(this string valor, string salt)
    {
        using (var sha256 = SHA256.Create())
        {
            var combinedInputs = Encoding.UTF8.GetBytes(valor + salt);
            var hash = sha256.ComputeHash(combinedInputs);
            return BitConverter.ToString(hash).Replace("-", "").ToLower();
        }
    }

    public static string GerarSalt(int tamanho)
    {
        using var rng = RandomNumberGenerator.Create();
        var saltBytes = new byte[tamanho];
        rng.GetBytes(saltBytes);
        return Convert.ToBase64String(saltBytes);
    }
}
