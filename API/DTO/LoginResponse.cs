using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class LoginResponse
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public bool Status { get; set; }
    }
}