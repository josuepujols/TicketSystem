using System.Threading.Tasks;
using API.DTO;

namespace API.Interfaces
{
    public interface IAuthRepository
    {
        Task<ServerResponse> Register(RegisterDTO model);
        Task<LoginResponse> Login(LoginDTO model);
        Task<ServerResponse> UserExist(string username);
    }
}