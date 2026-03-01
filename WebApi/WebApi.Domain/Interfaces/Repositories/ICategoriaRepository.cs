using System;
using WebApi.Domain.Entities;

namespace WebApi.Domain.Interfaces.Repositories;

public interface ICategoriaRepository : IBaseRepository<Categoria>
{
    Task<(decimal Receitas, decimal Despesas)> RecuperarTotaisPorIdAsync(Guid Id, CancellationToken ct);
}
