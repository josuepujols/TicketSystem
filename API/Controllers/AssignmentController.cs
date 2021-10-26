using API.Models;
using API.Interfaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize(Roles = UserRoles.Admin)]
    public class AssignmentController : GenericController<Assignment>
    {
        private IUnitOfWork<Assignment> _uof; 
        public AssignmentController(IUnitOfWork<Assignment> uof) : base(uof)
        {
            _uof = uof;
        }

        [HttpGet]
        public async Task<ActionResult> GetAssignMember()
        {
            var assignUser = await _uof.AssignmentRepository.GetAssignMember(); // TODO: create the AssigmentRepository
            return Ok(new { username = assignUser });
        }
    }
}