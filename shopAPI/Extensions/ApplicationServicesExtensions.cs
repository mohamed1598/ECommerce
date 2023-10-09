﻿using Core.Interfaces;
using Infrastracture.Data.Repositories;
using Infrastracture.Data.Services;
using Infrastracture.Repositories;
using Microsoft.AspNetCore.Mvc;
using shopAPI.Errors;

namespace shopAPI.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ITokenService,TokenService>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.Configure<ApiBehaviorOptions>(options =>
            {
                try
                {
                    options.InvalidModelStateResponseFactory = actionContext =>
                        {
                            var errors = actionContext.ModelState
                                .Where(e => e.Value!.Errors.Count >0 )
                                .SelectMany(x =>x.Value!.Errors)
                                .Select(x => x.ErrorMessage)
                                .ToArray();
                            var errorResponse = new ApiValidationErrorResponse
                            {
                                Errors = errors
                            };
                            return new BadRequestObjectResult(errorResponse);
                    };
                }catch (Exception _) { }
                
            });
            return services;
        }
    }
}
