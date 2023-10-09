using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastracture.Identity.SeedData
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Shafey",
                    Email = "test@test.test",
                    UserName = "test@test.test",
                    Address = new Address
                    {
                        FirstName = "Mohamed",
                        LastName = "Elshafey",
                        Street = "10 The Street",
                        City = "Santa",
                        ZipCode = "11111"
                    } 
                };
                await userManager.CreateAsync(user, "Pass@123");
            }
        }
    }
}
