using System;
using API.DTOs;
using API.Entities;
using API.Extensions;

using API.Interfaces;

namespace API.Extensions;

public static class AppUserExtensions
{
    public static UserDto ToDto(this AppUser user, ITockenService tockenService)
    {
          return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = tockenService.CreateTocken(user)
            };

     }
}
