using System;
using MediatR;
using WebApi.Application.Shared.Exceptions;
using WebApi.Domain.Entities;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Application.UseCases.PessoaEntity.Queries;

public record RecuperarPessoaPorIdRequest(
    string Id
) : IRequest<Pessoa>;

public class RecuperarPessoaPorIdHandler : IRequestHandler<RecuperarPessoaPorIdRequest, Pessoa>
{
    private readonly IPessoaRepository _pessoaRepos;

    public RecuperarPessoaPorIdHandler(
        IPessoaRepository pessoaRepos
    )
    {
        _pessoaRepos = pessoaRepos;
    }

    public async Task<Pessoa> Handle(
        RecuperarPessoaPorIdRequest request, 
        CancellationToken cancellationToken
    )
    {
        if(!Guid.TryParse(request.Id, out var id)) throw new AppException("O formato do ID informado é inválido.");

        var pessoa = await _pessoaRepos.RecuperarAsync(id, cancellationToken) ?? throw new NotFoundException("O ID informado não pertence a nenhuma pessoa.");

        return pessoa;
    }
}
