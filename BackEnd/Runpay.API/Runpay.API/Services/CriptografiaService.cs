using System.Drawing;
using System.Security.Cryptography;
using System.Text;

namespace Runpay.API.Services;

public static class CriptografiaService
{
    private static RandomNumberGenerator randomNumberGenerator = RandomNumberGenerator.Create();
    private static readonly int SaltSize = 16;
    private static readonly int HashSize = 20;
    private static readonly int Iterations = 10000;
    public static string GerarHash(this string valor)
    {
        byte[] salt;
        randomNumberGenerator.GetBytes(salt = new byte[SaltSize]);

        var passwordBytes = Encoding.UTF8.GetBytes(valor);
        var key = new Rfc2898DeriveBytes(passwordBytes, salt, Iterations, HashAlgorithmName.SHA256);
        var hash = key.GetBytes(HashSize);

        var hashBytes = new byte[SaltSize + HashSize];
        Array.Copy(salt, 0, hashBytes, 0, SaltSize);
        Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

        var base64Hash = Convert.ToBase64String(hashBytes);

        return base64Hash;
    }

    public static bool VerificarSenha(string valor, string base64Hash)
    {
        var hashBytes = Convert.FromBase64String(base64Hash);

        var salt = new byte[SaltSize];
        Array.Copy(hashBytes, 0, salt, 0, SaltSize);

        var passwordBytes = Encoding.UTF8.GetBytes(valor);
        var key = new Rfc2898DeriveBytes(passwordBytes, salt, Iterations, HashAlgorithmName.SHA256);
        byte[] hash = key.GetBytes(HashSize);

        for (var i = 0; i < HashSize; i++)
        {
            if (hashBytes[i + SaltSize] != hash[i])
                return false;
        }
        return true;
    }
}
