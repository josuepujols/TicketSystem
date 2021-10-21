using System;
using System.Threading.Tasks;
using API.Interfaces;
using API.DTO;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class AuthController : BaseController
    {
        private IAuthRepository _auth;
        private IUnitOfWork<AppUser> _uof;

        public AuthController(IAuthRepository authRepository, IUnitOfWork<AppUser> unitOfWork)
        {
            _uof = unitOfWork;
            _auth = authRepository;
        }       

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDTO model)
        {
            try 
            {
                var response = await _auth.Register(model);
                return Ok(response);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDTO model) 
        {
            try 
            {
                var response = await _auth.Login(model);
                return Ok(response);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}