using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using API.Enums;

namespace API.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        
        private ApiContext _context;
        private DbSet<AppUser> _usersRepo;
        private IConfiguration _configuration;
        public AuthRepository(ApiContext context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
            _usersRepo = _context.AppUsers;
        }

        /* ------------ Login Section ---------------- */

        public async Task<LoginResponse> Login(LoginDTO model)
        {
            var doesExist = await UserExist(model.Username);
            if(doesExist.Status) return new LoginResponse {  Status = !doesExist.Status };

            var user = await _usersRepo.SingleOrDefaultAsync(x => x.Username == model.Username);

            return VerifyPasswordHash(model.Password, user.PasswordHash, user.PasswordSalt)
            ? new LoginResponse { UserId = user.Id.ToString(), Username = user.Username, Token = GenerateToken(user), Role = user.Role.ToString(), Status = true }
            : new LoginResponse { Status = false };

            throw new NotImplementedException();
        }

        private string GenerateToken(AppUser model)
        {
            List<Claim> claims = new List<Claim>
            {
              new Claim(ClaimTypes.NameIdentifier, model.Id.ToString()),
              new Claim(ClaimTypes.Name, model.Username),
              new Claim(ClaimTypes.Role, model.Role.ToString())
            };
        
            var SecretKey = _configuration.GetSection("SecretKey").Value;
            var SimmetricKey = new SymmetricSecurityKey(ASCIIEncoding.UTF8.GetBytes(SecretKey));
        
            SigningCredentials credentials  = new SigningCredentials(SimmetricKey, SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor tokenDecriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(8),
                SigningCredentials = credentials
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDecriptor);

            return tokenHandler.WriteToken(token);
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(ASCIIEncoding.UTF8.GetBytes(password));
                for (int i=0; i < computedHash.Length; i++)
                {
                    if(computedHash[i] != passwordHash[i]) return false;    
                }
            }

            return true;
        }        

        /* --------------- Register Section --------------- */

        public async Task<ServerResponse> Register(RegisterDTO model)
        {
            var doesExist = await UserExist(model.Username);
            if(!doesExist.Status) return doesExist;

            CreatePasswordHash(model.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new AppUser 
            {
                Username = model.Username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = Roles.User, // It assigns the User Role as default 
                Status = true
            };    

            await _usersRepo.AddAsync(user);
            return await _context.SaveChangesAsync() > 0
            ? new ServerResponse { Title = "Registration process succed", Message = "User created successfully", Status = true }
            : new ServerResponse { Title = "Registration process failed", Message = "User registration failed", Status = false };       
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.ASCIIEncoding.UTF8.GetBytes(password));
            }
        }

        /* --------------- Validate User existence ----------- */

        public async Task<ServerResponse> UserExist(string username)
        {
            var doesExist = await _usersRepo.AnyAsync<AppUser>(x => x.Username.ToLower() == username.ToLower());
            
            return doesExist 
            ? new ServerResponse { Title = "User exists", Message = "This user is taken", Status = false }
            : new ServerResponse { Title = "User available", Message = "This user can be used", Status = true };
        }
    }
}