
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
       public static async Task SeedUserAsync(UserManager<AppUser> userManager)
       {

           if(!userManager.Users.Any())
           
{
            var user =new AppUser
            {
                DisplayName="Thai",
                Email="Dohongthaisdd@gmail.com",
                UserName= "Dohongthaisdd@gmail.com",
                Address= new Address
                {
                    FirstName="Do Hong",
                    LastName= "Thai",
                    Street="28/10, Long Binh",
                    City ="Bien Hoa",
                    Sate="Dong Nai",
                    ZipCode="3979"
                }
             };
            await userManager.CreateAsync(user, "Pa$$w0rd");
        }
           
       }
    }
}