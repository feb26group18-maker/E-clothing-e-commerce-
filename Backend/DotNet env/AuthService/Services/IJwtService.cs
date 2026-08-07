using System.Security.Claims;
using AuthService.Models.Entities;

namespace AuthService.Services
{
    public interface IJwtService
    {
        string GenerateToken(User user);
        ClaimsPrincipal? ValidateToken(string token);
    }
}
