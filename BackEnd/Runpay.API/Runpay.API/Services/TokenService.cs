using Microsoft.IdentityModel.Tokens;
using System.Text;
using Runpay.API.Domain.Model;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace Runpay.API.Services;

public class TokenService
{
    public static object GenerateToken(Conta conta)
    {
        var key = Encoding.ASCII.GetBytes(Key.Secret);
        var tokenConfig = new SecurityTokenDescriptor
        {
            Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
            {
                new Claim("ContaId", conta.Id.ToString()),
                new Claim("NumeroConta", conta.NumeroConta.ToString()),
            }),
            Expires = DateTime.UtcNow.AddMinutes(30),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenConfig);
        var tokenString = tokenHandler.WriteToken(token);

        return new
        {
            token = tokenString
        };

    }
}
