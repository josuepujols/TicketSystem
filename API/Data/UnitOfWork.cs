using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;

namespace API.Data
{
    public class UnitOfWork<T> : IUnitOfWork<T> where T : class
    {
        private ApiContext _context;
        public UnitOfWork(ApiContext context, IAuthRepository authRepository, IGenericRepository<T> genericRepository)
        {
            _context = context;
            TRepository = genericRepository;
            AuthRepository = authRepository;
        }

        public IGenericRepository<T> TRepository { get; }

        public IAuthRepository AuthRepository { get; }

        public IAssignmentRepository AssignmentRepository { get; }

        public async Task<bool> CommitChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}