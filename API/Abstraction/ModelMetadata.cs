using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Abstraction
{
    public abstract class ModelMetadata
    {
        [Key]
        public Guid Id { get; set; }
        [DataType(DataType.Date)]
        public DateTime Created { get; set; } = DateTime.Now;
        [DataType(DataType.Date)]
        public DateTime Modified { get; set; } = DateTime.Now;
    }
}