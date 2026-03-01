using System;
using MediatR;
using WebApi.Application.Shared.Exceptions;
using WebApi.Domain.Entities;
using WebApi.Domain.Enums;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Application.UseCases.PessoaEntity.Commands.EditarPessoa;

public record EditarPessoaRequest(
    string Id,
    string? Nome,
    int? Idade
) : IRequest<Pessoa>;

public class EditarPessoaHandler : IRequestHandler<EditarPessoaRequest, Pessoa>
{
    private readonly IPessoaRepository _pessoaRepos;
    private readonly ITransacaoRepository _transacaoRepos;
    private readonly IUnitOfWork _unitOfWork;

    public EditarPessoaHandler(
        IPessoaRepository pessoaRepos,
        ITransacaoRepository transacaoRepos,
        IUnitOfWork unitOfWork
    )
    {
        _pessoaRepos = pessoaRepos;
        _transacaoRepos = transacaoRepos;
        _unitOfWork = unitOfWork;
    }

    public async Task<Pessoa> Handle(
        EditarPessoaRequest request, 
        CancellationToken cancellationToken)
    {   
        if(!Guid.TryParse(request.Id, out var id)) throw new AppException("O formato do ID informado é inválido.");

        var pessoa = await _pessoaRepos.RecuperarAsync(id, cancellationToken) ?? throw new NotFoundException("O ID informado não pertence a nenhuma pessoa.");

        if(request.Nome != null) pessoa.EditarNome(request.Nome);

        /*

        Se há alguma transação do tipo receita associada a essa pessoa,
        sua idade não pode ser menor que 18 anos.

        O método VerificarExistenciaPorPessoaIdAsync performa a operação no db,
        ou seja, as entidades transações não precisam ser carregadas na memória.

        */

        if(request.Idade != null)
        {   
            if(request.Idade < 18 && await _transacaoRepos.VerificarExistenciaPorPessoaIdAsync(id, cancellationToken, Tipo.receita)) throw new AppException("A pessoa associada ao ID informado tem receitas, então não pode ser menor de idade.");

            pessoa.EditarIdade((int)request.Idade);
        }

        await _unitOfWork.SalvarAsync(cancellationToken);

        return pessoa;
    }
}
