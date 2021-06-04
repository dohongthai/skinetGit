using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName {get;set;}
          [Required]
          [EmailAddress]
        public string Email {get;set;}
          [Required]
          [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&lt;,])(?!.*\\s).*$",ErrorMessage ="mat khau phai co 1 ")]
        public string Password {get;set;}
    }
}