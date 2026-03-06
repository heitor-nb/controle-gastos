using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Infra.Persistance.Repositories;

namespace WebApi.Infra.Persistance;

public static class ServiceCollectionExtensions
{
    // Método de extensão para adicionar os serviços sem poluir o Program.cs

    public static IServiceCollection AddPersistanceServices(
        this IServiceCollection services,
        IConfiguration cfg
    )
    {
        services.AddDbContext<WebApiContext>(options => options.UseNpgsql(cfg.GetConnectionString("Default")));

        services.AddScoped<IPessoaRepository, PessoaRepository>();
        services.AddScoped<ICategoriaRepository, CategoriaRepository>();
        services.AddScoped<ITransacaoRepository, TransacaoRepository>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}
