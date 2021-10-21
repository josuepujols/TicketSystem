using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Abstraction;
using API.Enums;

namespace API.Models
{
    public class AppUser : ModelMetadata
    {
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public Roles Role { get; set; }
        public bool Status { get; set; } = true;
    }
}