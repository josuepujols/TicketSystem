using System;
using API.Abstraction;
using API.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Ticket : ModelMetadata
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Priority Importance { get; set; }
        public Guid UserId { get; set; }
        public Nullable<Guid> AssignTo { get; set; }
        public bool IsCompleted { get; set; } = false; 
        
        public Ticket()
        {
            IsCompleted = false;
        }

    }
}