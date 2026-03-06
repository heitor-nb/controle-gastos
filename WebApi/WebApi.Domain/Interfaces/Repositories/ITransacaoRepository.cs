using System;
using WebApi.Domain.Entities;

namespace WebApi.Domain.Interfaces.Repositories;

public interface ITransacaoRepository : IBaseRepository<Transacao>
{
    Task<List<Transacao>> RecuperarPorPessoaIdAsync(Guid pessoaId, CancellationToken ct);
    Task<List<Transacao>> RecuperarTodosAsync(
        CancellationToken ct, 
        bool includeCategoria = false,
        bool includePessoa = false
    );
    Task<(decimal Receitas, decimal Despesas)> RecuperarTotaisPorPessoaIdAsync(Guid pessoaId, CancellationToken ct);
    Task<(decimal Receitas, decimal Despesas)> RecuperarTotaisPorCategoriaIdAsync(Guid categoriaId, CancellationToken ct);
}
