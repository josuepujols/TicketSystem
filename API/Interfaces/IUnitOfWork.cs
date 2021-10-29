using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork<T> : IDisposable where T : class
    {
        IGenericRepository<T> TRepository { get; }
        IAuthRepository AuthRepository { get; }
        Task<bool> CommitChangesAsync();
    }
}