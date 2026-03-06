using System;
using WebApi.Domain.Entities;

namespace WebApi.Domain.Interfaces.Repositories;

public interface IPessoaRepository : IBaseRepository<Pessoa>
{
    Task<Pessoa> EditarAsync(
        Guid id, 
        CancellationToken ct,
        string? nome = null,
        int? idade = null
    );
}
