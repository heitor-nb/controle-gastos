using System;
using WebApi.Domain.Entities;
using WebApi.Domain.Enums;

namespace WebApi.Domain.Interfaces.Repositories;

public interface ITransacaoRepository : IBaseRepository<Transacao>
{
    Task<bool> VerificarExistenciaPorPessoaIdAsync(
        Guid pessoaId, 
        CancellationToken ct,
        Tipo? tipo = null
    );
    Task<List<Transacao>> RecuperarPorPessoaIdAsync(Guid pessoaId, CancellationToken ct);
    Task<(decimal Receitas, decimal Despesas)> RecuperarTotaisPorPessoaIdAsync(Guid pessoaId, CancellationToken ct);
}
