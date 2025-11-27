using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    public string displayName { get; set; } = "";

    [Required]
    [EmailAddress]
    public string email { get; set; } = "";
    [Required]
    [MinLength(4)]

    public string password { get; set; } = "";
}
