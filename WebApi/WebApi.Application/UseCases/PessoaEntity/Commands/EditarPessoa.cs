using System;
using MediatR;
using WebApi.Application.Shared.Exceptions;
using WebApi.Domain.Entities;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Application.UseCases.PessoaEntity.Commands;

public record EditarPessoaRequest(
    string Id,
    string? Nome,
    int? Idade
) : IRequest<Pessoa>;

public class EditarPessoaHandler : IRequestHandler<EditarPessoaRequest, Pessoa>
{
    private readonly IPessoaRepository _pessoaRepos;

    public EditarPessoaHandler(
        IPessoaRepository pessoaRepos
    )
    {
        _pessoaRepos = pessoaRepos;
    }

    public async Task<Pessoa> Handle(
        EditarPessoaRequest request, 
        CancellationToken cancellationToken)
    {   
        if(!Guid.TryParse(request.Id, out var id)) throw new AppException("O formato do ID informado é inválido.");

        var pessoaEditada = await _pessoaRepos.EditarAsync(
            id,
            cancellationToken,
            request.Nome,
            request.Idade
        );

        return pessoaEditada;
    }
}
