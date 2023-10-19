using System.Security.Claims;

namespace shopAPI.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string? RetreiveEmailFromPrincipal(this ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.Email);
        }
    }
}
