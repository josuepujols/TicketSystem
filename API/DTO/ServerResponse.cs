using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class ServerResponse
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public bool Status { get; set; }
    }
}