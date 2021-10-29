using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Services
{
    public static class ApplicationServices
    {
        public static IServiceCollection GetApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped(typeof(IUnitOfWork<>), typeof(UnitOfWork<>));     
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<ITicketRepository, TicketsRepository>();

            // That is saying whenever a IBloggerRepository is required, create a BloggerRepository and pass that in.

            return services;
        }
    }
}