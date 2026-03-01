using System;
using MediatR;
using WebApi.Domain.Entities;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Application.UseCases.PessoaEntity.Queries;

public class RecuperarPessoasRequest(
    // int PageNumber // Caso fosse necessário implementar paginação.
) : IRequest<List<Pessoa>>;

public class RecuperarPessoasHandler : IRequestHandler<RecuperarPessoasRequest, List<Pessoa>>
{
    private readonly IPessoaRepository _pessoaRepos;

    public RecuperarPessoasHandler(
        IPessoaRepository pessoaRepos
    )
    {
        _pessoaRepos = pessoaRepos;
    }
    
    public async Task<List<Pessoa>> Handle(RecuperarPessoasRequest request, CancellationToken cancellationToken)
    {
        var pessoas = await _pessoaRepos.RecuperarTodosAsync(cancellationToken);

        return pessoas;
    }
}
