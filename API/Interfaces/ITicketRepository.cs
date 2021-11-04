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
        Task<PagedData<Ticket>> GetUserTickets(PaginationFilter filters, string userId);
        Task<PagedData<Ticket>> GetAllAdminAsync(PaginationFilter filters);
        Task<IEnumerable<object>> GetSupportPersonal();
    }
}