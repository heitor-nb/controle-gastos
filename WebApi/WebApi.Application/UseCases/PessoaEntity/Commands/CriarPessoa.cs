using System;
using MediatR;
using WebApi.Domain.Entities;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Application.UseCases.PessoaEntity.Commands;

public record CriarPessoaRequest(
    string Nome,
    int Idade
) : IRequest<Pessoa>;

public class CriarPessoaHandler : IRequestHandler<CriarPessoaRequest, Pessoa>
{
    private readonly IPessoaRepository _pessoaRepos;

    public CriarPessoaHandler(
        IPessoaRepository pessoaRepos
    )
    {
        _pessoaRepos = pessoaRepos;
    }

    public async Task<Pessoa> Handle(
        CriarPessoaRequest request, 
        CancellationToken cancellationToken)
    {
        /*

        Na documentação, não é especificado que o nome da pessoa deve ser único.
        Mas eu considerei interessante que essa propriedade fosse única.
        obs.: a validação ocorre dentro da transaction do db.

        */

        var pessoa = new Pessoa(
            request.Nome,
            request.Idade
        );

        await _pessoaRepos.CriarAsync(pessoa, cancellationToken);

        return pessoa;
    }
}
