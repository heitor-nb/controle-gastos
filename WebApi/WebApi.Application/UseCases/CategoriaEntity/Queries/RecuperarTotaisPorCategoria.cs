using System;
using MediatR;
using WebApi.Application.Shared.Dtos;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Application.UseCases.CategoriaEntity.Queries;

public class RecuperarTotaisPorCategoriaRequest(
    // int PageNumber // Caso fosse necessário implementar paginação.
) : IRequest<TotaisPorCategoria>;

public class RecuperarTotaisPorCategoriaHandler : IRequestHandler<RecuperarTotaisPorCategoriaRequest, TotaisPorCategoria>
{
    private readonly ICategoriaRepository _categoriaRepos;
    private readonly ITransacaoRepository _transacaoRepos;

    public RecuperarTotaisPorCategoriaHandler(
        ICategoriaRepository categoriaRepos,
        ITransacaoRepository transacaoRepos
    )
    {
        _categoriaRepos = categoriaRepos;
        _transacaoRepos = transacaoRepos;
    }
    
    public async Task<TotaisPorCategoria> Handle(
        RecuperarTotaisPorCategoriaRequest request, 
        CancellationToken cancellationToken
    )
    {
        var categorias = await _categoriaRepos.RecuperarTodosAsync(cancellationToken);

        List<TotaisCategoria> totaisCategorias = [];

        foreach(var c in categorias)
        {   
            /*

            Em vez de carregar as entidades transações associadas completas na memória
            e depois calcular os totais da categoria no código, pode-se performar essa
            operação no próprio banco de dados (que é mais eficiente p/ isso).

            */

            var (Receitas, Despesas) = await _transacaoRepos.RecuperarTotaisPorCategoriaIdAsync(c.Id, cancellationToken);

            totaisCategorias.Add(new(
                c.Id.ToString(),
                c.Descricao.Valor,
                c.Finalidade,
                Receitas,
                Despesas,
                Receitas - Despesas
            ));
        }

        var receitasTotais = totaisCategorias.Sum(t => t.Receitas);
        var despesasTotais = totaisCategorias.Sum(t => t.Despesas);

        return new(
            totaisCategorias,
            receitasTotais,
            despesasTotais,
            receitasTotais - despesasTotais
        );
    }
}
