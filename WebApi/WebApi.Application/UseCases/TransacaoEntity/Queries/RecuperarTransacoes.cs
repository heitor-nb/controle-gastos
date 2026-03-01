using System;
using MediatR;
using WebApi.Application.Shared.Dtos;
using WebApi.Application.Shared.Mappings;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Application.UseCases.TransacaoEntity.Queries;

public record RecuperarTransacoesRequest(
    // int PageNumber // Caso fosse necessário implementar paginação.
) : IRequest<List<TransacaoDto>>;

public class RecuperarTransacoesHandler : IRequestHandler<RecuperarTransacoesRequest, List<TransacaoDto>>
{
    private readonly ITransacaoRepository _transacaoRepos;

    public RecuperarTransacoesHandler(
        ITransacaoRepository transacaoRepos
    )
    {
        _transacaoRepos = transacaoRepos;
    }
    
    public async Task<List<TransacaoDto>> Handle(
        RecuperarTransacoesRequest request, 
        CancellationToken cancellationToken
    )
    {
        var transacoes = await _transacaoRepos.RecuperarTodosAsync(
            cancellationToken,
            includeCategoria: true
        );

        return [.. transacoes.Select(t => t.ToDto())];
    }
}
