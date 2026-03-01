using System;
using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Entities;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Infra.Persistance.Repositories;

public abstract class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
{
    protected readonly WebApiContext _context;

    public BaseRepository(
        WebApiContext context
    )
    {
        _context = context;
    }

    public async Task CriarAsync(T t, CancellationToken ct)
    {
        await _context.Set<T>().AddAsync(t, ct);
    }

    public void Deletar(T t)
    {
        _context.Set<T>().Remove(t);
    }

    public void Editar(T t)
    {
        _context.Set<T>().Update(t);
    }

    public async Task<T?> RecuperarAsync(Guid id, CancellationToken ct)
    {
        var t = await _context.Set<T>().SingleOrDefaultAsync(t => t.Id == id, ct);

        return t;
    }

    public async Task<List<T>> RecuperarTodosAsync(CancellationToken ct)
    {
        var ts = await _context.Set<T>().ToListAsync(ct);

        return ts;
    }
}
