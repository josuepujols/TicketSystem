using API.Models;
using API.Data;
using API.Interfaces;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class AssignmentRepository : IAssignmentRepository
    {
        private ApiContext _context;
        private DbSet<Assignment> _repo;
        public AssignmentRepository(ApiContext context)
        {
            _context = context;
            _repo = _context.Set<Assignment>();
        }
        public async Task<string> GetAssignMember()
        {
            var assignUsers = await _repo.ToListAsync<Assignment>(); // FIXME: Implement the logic 
        }
    }
}