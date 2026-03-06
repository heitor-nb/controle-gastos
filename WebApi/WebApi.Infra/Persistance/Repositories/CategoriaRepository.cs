using System;
using Microsoft.EntityFrameworkCore;
using WebApi.Application.Shared.Exceptions;
using WebApi.Domain.Entities;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Infra.Persistance.Repositories;

public class CategoriaRepository : BaseRepository<Categoria>, ICategoriaRepository
{
    public CategoriaRepository(WebApiContext context) : base(context)
    {
    }

    public new async Task CriarAsync(
        Categoria categoria, 
        CancellationToken ct
    )
    {
        await using var transaction = await _context.Database.BeginTransactionAsync(ct);

        var existingCategoria = await _context.Categorias.SingleOrDefaultAsync(p => p.Descricao == categoria.Descricao, ct);

        if(existingCategoria != null) throw new AppException("A descrição informada já é associada a uma categoria.");

        await _context.Categorias.AddAsync(categoria, ct);
        await _context.SaveChangesAsync(ct);

        await transaction.CommitAsync(ct);
    }
}
