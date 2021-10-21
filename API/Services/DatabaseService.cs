using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace API.Services
{
    public static class DatabaseService
    {
        public static IServiceCollection GetDbServices(this IServiceCollection services, IConfiguration configuration)
        {

            // if(Environments.Production.Equals("Production"))
            // {
            //     services.AddDbContext<ApiContext>(opt => opt.UseSqlServer(configuration.GetConnectionString("ProductionConnection")));
            // } 
            // else {
            //     services.AddDbContext<ApiContext>(opt => opt.UseSqlite(configuration.GetConnectionString("DevConnection"))); 
            // }
            
            services.AddDbContext<ApiContext>(opt => opt.UseSqlite(configuration.GetConnectionString("DevConnection"))); 

            return services;
            
        }
    }
}