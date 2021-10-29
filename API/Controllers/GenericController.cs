using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using API.DTO;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Controllers
{
    //[Authorize(Roles = UserRoles.Admin)]
    [AllowAnonymous]
    public class GenericController<T> : BaseController where T : class
    {
        private IUnitOfWork<T> _uof;
        private IGenericRepository<T> _repo;

        public GenericController(IUnitOfWork<T> uof)
        {
            _uof = uof;
            _repo = _uof.TRepository;
        }

        [HttpGet]        
        public async Task<ActionResult> GetAll([FromQuery] PaginationFilter filters)
        {
            try
            {
                return Ok(await _repo.GetAllAsync(filters));
            }   
            catch(Exception ex)
            {
                return new JsonResult(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(Guid id)
        {
            try 
            {
                return new JsonResult(await _repo.GetByIdAsync(id));
            }
            catch(Exception ex)
            {
                return new JsonResult(ex.Message);
            }
        }


        [HttpPost("create")]
        public async Task<ActionResult> Create(T model)
        {
            try 
            {
                await _repo.InsertAsync(model);
                return  new JsonResult(await _uof.CommitChangesAsync()); 
            }
            catch(Exception ex)
            {
                return new JsonResult(ex.Message);
            }
        }

        
        [HttpPut("edit/{id}")]
        public async Task<ActionResult> Update(T model)
        {
            try 
            {
                _repo.Update(model);
                return new JsonResult(await _uof.CommitChangesAsync());
            }
            catch(Exception ex)
            {
                return new JsonResult(ex.Message);
            }
        }

       
        [HttpDelete("remove/{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
             try 
            {
                await _repo.DeleteAsync(id);
                return new JsonResult(await _uof.CommitChangesAsync());
            }
            catch(Exception ex)
            {
                return new JsonResult(ex.Message);
            }
        }

    }
}