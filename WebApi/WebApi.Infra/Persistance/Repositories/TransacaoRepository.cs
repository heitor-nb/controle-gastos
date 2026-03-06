using System;
using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Entities;
using WebApi.Domain.Enums;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Infra.Persistance.Repositories;

public class TransacaoRepository : BaseRepository<Transacao>, ITransacaoRepository
{
    public TransacaoRepository(WebApiContext context) : base(context)
    {
    }

    public async Task<List<Transacao>> RecuperarPorPessoaIdAsync(Guid pessoaId, CancellationToken ct)
    {
        var transacoes = await _context.Transacoes.Where(t => t.PessoaId == pessoaId).ToListAsync(ct);

        return transacoes;
    }

    public async Task<List<Transacao>> RecuperarTodosAsync(
        CancellationToken ct, 
        bool includeCategoria = false,
        bool includePessoa = false
    )
    {
        var transacoes = _context.Transacoes.AsQueryable();

        /*

        O Include permite carregar entidades associadas.
        Então, por exemplo, se eu fizer transacoes.Include(t => t.Pessoa),
        eu posso acessar as propriedades da Pessoa associada a cada transação.

        */

        if(includeCategoria) transacoes = transacoes.Include(t => t.Categoria);
        if(includePessoa) transacoes = transacoes.Include(t => t.Pessoa);

        return await transacoes.ToListAsync(ct);
    }

    public async Task<(decimal Receitas, decimal Despesas)> RecuperarTotaisPorCategoriaIdAsync(
        Guid categoriaId, 
        CancellationToken ct
    )
    {
        var receitas = await _context.Transacoes
            .Where(t => t.CategoriaId == categoriaId && t.Tipo == Tipo.receita.ToString())
            .SumAsync(t => t.Valor, ct);

        var despesas = await _context.Transacoes
            .Where(t => t.CategoriaId == categoriaId && t.Tipo == Tipo.despesa.ToString())
            .SumAsync(t => t.Valor, ct);

        return (receitas, despesas);
    }

    public async Task<(decimal Receitas, decimal Despesas)> RecuperarTotaisPorPessoaIdAsync(
        Guid pessoaId, 
        CancellationToken ct
    )
    {   
        var receitas = await _context.Transacoes
            .Where(t => t.PessoaId == pessoaId && t.Tipo == Tipo.receita.ToString())
            .SumAsync(t => t.Valor, ct);

        var despesas = await _context.Transacoes
            .Where(t => t.PessoaId == pessoaId && t.Tipo == Tipo.despesa.ToString())
            .SumAsync(t => t.Valor, ct);

        return (receitas, despesas);
    }
}
