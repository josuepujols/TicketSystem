using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Models;

namespace API.Interfaces
{
    public interface ITicketRepository
    {
        Task<PagedData<TicketDTO>> GetUserTickets(PaginationFilter filters, string userId);
        Task<IEnumerable<object>> GetSupportPersonal();
    }
}