using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface IAssignmentRepository
    {
         Task<string> GetAssignMember();

    }
}