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

        public async Task<PagedData<TicketDTO>> GetUserTickets(PaginationFilter filters, string userId)
        {
            var tickets = await _context.Tickets
                .Skip<Ticket>((filters.PageNumber - 1) * filters.PageSize)
                .Take<Ticket>(filters.PageSize)
                .Where<Ticket>(x => x.UserId.Equals(Guid.Parse(userId)))
                .ToListAsync<Ticket>();

                var totalTickets = await _context.Tickets.CountAsync<Ticket>();

                List<TicketDTO> AllTicket = new List<TicketDTO>();
                

                foreach(var item in tickets) {
                    var user = await _context.AppUsers.FirstOrDefaultAsync(x => x.Id == item.AssignTo);
                    TicketDTO DataSend = new TicketDTO() {
                        Id = item.Id,
                        Title = item.Title,
                        Description = item.Description,
                        Importance = item.Importance,
                        UserId = item.UserId,
                        AssignTo = item.AssignTo,
                        IsCompleted = item.IsCompleted,
                        Created = item.Created,
                        UserName = user.Username
                    };

                    AllTicket.Add(DataSend);
                }

                var response = new PagedData<TicketDTO>()
                {
                    TotalCount = totalTickets,
                    PageNumber = filters.PageNumber,
                    PageSize = filters.PageSize,
                    Records = AllTicket
                };

                return response;
        }

    }
}