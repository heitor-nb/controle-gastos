using Microsoft.EntityFrameworkCore;
using WebApi.Api;
using WebApi.Application.UseCases.PessoaEntity.Commands.CriarPessoa;
using WebApi.Infra.Persistance;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddPersistanceServices(builder.Configuration);
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<CriarPessoaHandler>());

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// app.UseHttpsRedirection();

app.MapControllers();

app.UseMiddleware<ExceptionHandlingMiddleware>();

using var scope = app.Services.CreateScope();
{
    var context = scope.ServiceProvider.GetRequiredService<WebApiContext>();

    context.Database.Migrate();
}

app.Run();
