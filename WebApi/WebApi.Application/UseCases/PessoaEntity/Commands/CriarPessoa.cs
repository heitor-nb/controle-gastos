using System;
using MediatR;
using WebApi.Domain.Entities;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Application.UseCases.PessoaEntity.Commands.CriarPessoa;

public record CriarPessoaRequest(
    string Nome,
    int Idade
) : IRequest<Pessoa>;

public class CriarPessoaHandler : IRequestHandler<CriarPessoaRequest, Pessoa>
{
    private readonly IPessoaRepository _pessoaRepos;
    private readonly IUnitOfWork _unitOfWork;

    public CriarPessoaHandler(
        IPessoaRepository pessoaRepos,
        IUnitOfWork unitOfWork
    )
    {
        _pessoaRepos = pessoaRepos;
        _unitOfWork = unitOfWork;
    }

    public async Task<Pessoa> Handle(
        CriarPessoaRequest request, 
        CancellationToken cancellationToken)
    {
        /*

        Na documentação, não é especificado que o nome da pessoa deve ser único.
        Por isso não há essa validação.

        */

        var pessoa = new Pessoa(
            request.Nome,
            request.Idade
        );

        await _pessoaRepos.CriarAsync(pessoa, cancellationToken);
        await _unitOfWork.SalvarAsync(cancellationToken);

        return pessoa;
    }
}
