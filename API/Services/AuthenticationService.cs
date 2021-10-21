using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public static class AuthenticationService
    {
        public static IServiceCollection GetAuthServices(this IServiceCollection services, IConfiguration configuration)
        {
            var secretKey = configuration.GetSection("SecretKey").Value;
            var simmetricKey = ASCIIEncoding.ASCII.GetBytes(secretKey);

            TokenValidationParameters validationParameters = new TokenValidationParameters 
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(simmetricKey),
                ValidateIssuer = false,
                ValidateAudience = false
            };
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt => opt.TokenValidationParameters = validationParameters);
            
            return services;
        }        
    }
}