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

    public RecuperarTotaisPorCategoriaHandler(
        ICategoriaRepository categoriaRepos
    )
    {
        _categoriaRepos = categoriaRepos;
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
            var (Receitas, Despesas) = await _categoriaRepos.RecuperarTotaisPorIdAsync(c.Id, cancellationToken);

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
