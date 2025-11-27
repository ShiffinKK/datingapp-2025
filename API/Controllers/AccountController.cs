using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Extensions;

namespace API.Controllers
{

    public class AccountController(AppDbContext context,ITockenService tockenService) : BaseController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await EmailExists(registerDto.email)) return BadRequest("Email taken");
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                DisplayName = registerDto.displayName,
                Email = registerDto.email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
                PasswordSalt = hmac.Key
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return user.ToDto(tockenService);

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDtos loginDtos)
        {
            var user = await context.Users.SingleOrDefaultAsync(x => x.Email == loginDtos.Email);
            if (user == null) return Unauthorized("Invalid Email Address");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDtos.Password));
            for (var i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");

            }
            return user.ToDto(tockenService);

        }

        private async Task<bool> EmailExists(string email)
        {
            return await context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
        }     
       
    }
}
