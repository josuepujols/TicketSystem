using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using API.DTO;
using API.Data;

namespace API.Controllers
{
    [Authorize]
    public class TicketsController : GenericController<Ticket> 
    {
        private ApiContext _context;
        private ITicketRepository _repo;
        public TicketsController(IUnitOfWork<Ticket> unitOfWork, ITicketRepository repository) : base(unitOfWork)
        {
            _repo = repository;        
        }

        [HttpGet("personal")]
        public async Task<ActionResult> GetSupportMembes()
        {
            try 
            {
                return Ok(await _repo.GetSupportPersonal());
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }


        }

        [HttpGet("{userId}/all")]
        public async Task<ActionResult<PagedData<Ticket>>> GetAllUserTickets([FromQuery] PaginationFilter filters, string userId)
        {
            try 
            {
                var response = await _repo.GetUserTickets(filters, userId);
                return Ok(response);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }

        }

    }
}