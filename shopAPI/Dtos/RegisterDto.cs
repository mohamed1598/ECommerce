using System.ComponentModel.DataAnnotations;

namespace shopAPI.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; } = null!;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
            ErrorMessage ="Password must have 1 uppercase,1 lowercase, 1 number, 1 non alphanumerice and at least 6 characters")]
        public string Password { get; set; } = null!;
    }
}
