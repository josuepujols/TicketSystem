using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using API.DTO;
using API.Models;
using API.Abstraction;

namespace API.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {

        private ApiContext _context;
        private DbSet<T> _repo;

        public GenericRepository(ApiContext context)
        {
            _context = context;
            _repo = _context.Set<T>();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _repo.FindAsync(id);
            _repo.Remove(entity);
        }

        // TODO: Implement SearchTerm from filters

        public async Task<PagedData<T>> GetAllAsync(PaginationFilter filters)
        {
            var pagedData = await _repo
                .Skip<T>((filters.PageNumber - 1) * filters.PageSize)
                .Take<T>(filters.PageSize)
                .OrderBy(x => x)
                .ToListAsync<T>();
            
            var totalRecords = pagedData.Count; 

            return new PagedData<T> 
            { 
                Records = pagedData,
                TotalCount = totalRecords,
                PageSize = filters.PageSize,
                PageNumber = filters.PageNumber
            };

        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _repo.FindAsync(id);
        }

        public async Task InsertAsync(T model)
        {
            await _repo.AddAsync(model);
        }

        public void Update(T model)
        {
            _context.Attach(model);
            _context.Entry<T>(model).State = EntityState.Modified;
        }
    }
}