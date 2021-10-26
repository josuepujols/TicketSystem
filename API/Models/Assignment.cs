using System.ComponentModel.DataAnnotations;
using API.Abstraction;

namespace API.Models
{
    public class Assignment
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public virtual AppUser User { get; set; }
        public bool IsFree { get; set; }
    }
}