using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class TicketsRepository : ITicketRepository
    {
        private ApiContext _context;
        public TicketsRepository(ApiContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<object>> GetSupportPersonal()
        {
            var members = await _context.AppUsers.Where(x => ((int) x.Role) == 2).ToListAsync();
            return members.Select(x => new { x.Id, x.Username });            
        }

        public async Task<PagedData<Ticket>> GetUserTickets(PaginationFilter filters, string userId)
        {

            var list =  _context.Tickets.Where(x => x.UserId.Equals(Guid.Parse(userId))).AsQueryable();

            var tickets = list
                .Skip<Ticket>((filters.PageNumber - 1) * filters.PageSize)
                .Take<Ticket>(filters.PageSize)
                .ToList<Ticket>();

                var totalTickets = await _context.Tickets.CountAsync<Ticket>();

                var response = new PagedData<Ticket>()
                {
                    TotalCount = totalTickets,
                    PageNumber = filters.PageNumber,
                    PageSize = filters.PageSize,
                    Records = tickets
                };

                return response;
        }

    }
}