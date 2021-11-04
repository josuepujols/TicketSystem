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

        public async Task<PagedData<Ticket>> GetAllAdminAsync(PaginationFilter filters)
        {

            // var pagedData = await _repo
            //     .Skip<T>((filters.PageNumber - 1) * filters.PageSize)
            //     .Take<T>(filters.PageSize)
            //     .OrderBy(x => x)
            //     .ToListAsync<T>();

            IQueryable<Ticket> query = _context.Tickets;

            if (!string.IsNullOrEmpty(filters.SearchTerm)) {
                query = query.Where(x => (x.Title.Contains(filters.SearchTerm) || x.Description.Contains(filters.SearchTerm)));
            }

            if (filters.NumberStatus == 1) {
                query = query.Where(x => x.IsCompleted);
            }
            else if (filters.NumberStatus == 2) {
                query = query.Where(x => !x.IsCompleted);
            }

            var pagedData = await query.Skip<Ticket>((filters.PageNumber - 1) * filters.PageSize).Take<Ticket>(filters.PageSize).OrderBy(x => x.Title).ToListAsync();
            
            var totalRecords = pagedData.Count; 

            return new PagedData<Ticket> 
            { 
                Records = pagedData,
                TotalCount = totalRecords,
                PageSize = filters.PageSize,
                PageNumber = filters.PageNumber
            };

        }

        public async Task<PagedData<Ticket>> GetUserTickets(PaginationFilter filters, string userId)
        {
            //.Equals(Guid.Parse(userId))
            //var list =  _context.Tickets.Where(x => x.UserId.Equals(Guid.Parse(userId))).AsQueryable();

             IQueryable<Ticket> query = _context.Tickets;

             if (!string.IsNullOrEmpty(userId)) {
                 if (!string.IsNullOrEmpty(filters.SearchTerm)) {
                     query = query.Where(x => x.AssignTo == Guid.Parse(userId) && (x.Title.Contains(filters.SearchTerm) || x.Description.Contains(filters.SearchTerm)));
                 }
                 else {
                     query = query.Where(x => x.AssignTo == Guid.Parse(userId));
                 }

                 if (filters.NumberStatus == 1) {
                     query = query.Where(x => x.IsCompleted);
                 }
                 else if (filters.NumberStatus == 2) {
                     query = query.Where(x => !x.IsCompleted);
                 }
             }

            var tickets = await query.Skip<Ticket>((filters.PageNumber - 1) * filters.PageSize).Take<Ticket>(filters.PageSize).ToListAsync();

            // var totalTickets = await _context.Tickets.CountAsync<Ticket>();
            int totalTickets = tickets.Count;

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