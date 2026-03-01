using System;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Infra.Persistance.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly WebApiContext _context;

    public UnitOfWork(
        WebApiContext context
    )
    {
        _context = context;
    }

    public async Task SalvarAsync(CancellationToken ct)
    {
        await _context.SaveChangesAsync(ct);
    }
}
