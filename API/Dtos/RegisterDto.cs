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
          [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\W]{8,63}$",ErrorMessage ="Mật không hợp lệ ")]
        public string Password {get;set;}
    }
}