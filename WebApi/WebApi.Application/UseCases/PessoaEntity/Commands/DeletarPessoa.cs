using System;
using MediatR;
using WebApi.Application.Shared;
using WebApi.Application.Shared.Exceptions;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Application.UseCases.PessoaEntity.Commands;

public record DeletarPessoaRequest(
    string Id
) : IRequest<VoidResult>;

public class DeletarPessoaHandler : IRequestHandler<DeletarPessoaRequest, VoidResult>
{
    private readonly IPessoaRepository _pessoaRepos;
    private readonly ITransacaoRepository _transacaoRepos;
    private readonly IUnitOfWork _unitOfWork;

    public DeletarPessoaHandler(
        IPessoaRepository pessoaRepos,
        ITransacaoRepository transacaoRepos,
        IUnitOfWork unitOfWork
    )
    {
        _pessoaRepos = pessoaRepos;
        _transacaoRepos = transacaoRepos;
        _unitOfWork = unitOfWork;
    }

    public async Task<VoidResult> Handle(
        DeletarPessoaRequest request, 
        CancellationToken cancellationToken)
    {   
        if(!Guid.TryParse(request.Id, out var id)) throw new AppException("O formato do ID informado é inválido.");

        var pessoa = await _pessoaRepos.RecuperarAsync(id, cancellationToken) ?? throw new NotFoundException("O ID informado não pertence a nenhuma pessoa.");

        _pessoaRepos.Deletar(pessoa);

        var transacoes = await _transacaoRepos.RecuperarPorPessoaIdAsync(id, cancellationToken);
        foreach(var t in transacoes) _transacaoRepos.Deletar(t);

        await _unitOfWork.SalvarAsync(cancellationToken);

        return VoidResult.Instance;
    }
}
