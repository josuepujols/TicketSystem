using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using API.DTO;

namespace API.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<PagedData<T>> GetAllAsync(PaginationFilter filters);
        Task<T> GetByIdAsync(Guid id); 
        Task InsertAsync(T model);
        Task DeleteAsync(Guid id);
        void Update(T model);
    }
}