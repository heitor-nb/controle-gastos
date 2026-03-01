using System;
using WebApi.Domain.Entities;

namespace WebApi.Domain.Interfaces.Repositories;

public interface IBaseRepository<T> where T : BaseEntity
{
    // CREATE READ UPDATE DELETE

    Task CriarAsync(T t, CancellationToken ct);
    Task<List<T>> RecuperarTodosAsync(CancellationToken ct);
    Task<T> RecuperarAsync(Guid id, CancellationToken ct);
    void Editar(T t);
    void Deletar(T t);
}
