using System;
using MediatR;
using WebApi.Application.Shared.Dtos;
using WebApi.Application.Shared.Exceptions;
using WebApi.Application.Shared.Mappings;
using WebApi.Domain.Entities;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Domain.ValueObjects;

namespace WebApi.Application.UseCases.TransacaoEntity.Commands;

public record CriarTransacaoRequest(
    string Descricao,
    decimal Valor,
    string Tipo,
    string CategoriaId,
    string PessoaId
) : IRequest<TransacaoDto>;

public class CriarTransacaoHandler : IRequestHandler<CriarTransacaoRequest, TransacaoDto>
{
    private readonly ITransacaoRepository _transacaoRepos;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPessoaRepository _pessoaRepos;
    private readonly ICategoriaRepository _categoriaRepos;

    public CriarTransacaoHandler(
        IPessoaRepository pessoaRepos,
        ICategoriaRepository categoriaRepos,
        ITransacaoRepository transacaoRepos,
        IUnitOfWork unitOfWork
    )
    {   
        _pessoaRepos = pessoaRepos;
        _categoriaRepos = categoriaRepos;
        _transacaoRepos = transacaoRepos;
        _unitOfWork = unitOfWork;
    }

    public async Task<TransacaoDto> Handle(
        CriarTransacaoRequest request, 
        CancellationToken cancellationToken
    )
    {
        var descricao = new Descricao(request.Descricao);

        if(!Guid.TryParse(request.CategoriaId, out var categoriaId)) throw new AppException("O formato do ID de categoria informado é inválido.");
        if(!Guid.TryParse(request.PessoaId, out var pessoaId)) throw new AppException("O formato do ID de pessoa informado é inválido.");
        
        var categoria = await _categoriaRepos.RecuperarAsync(categoriaId, cancellationToken) ?? throw new NotFoundException("O ID de categoria informado não pertence a nenhuma categoria.");
        var pessoa = await _pessoaRepos.RecuperarAsync(pessoaId, cancellationToken) ?? throw new NotFoundException("O ID de pessoa informado não pertence a nenhuma pessoa.");

        var transacao = new Transacao(
            descricao,
            request.Valor,
            request.Tipo,
            categoria,
            pessoa
        );

        await _transacaoRepos.CriarAsync(transacao, cancellationToken);
        await _unitOfWork.SalvarAsync(cancellationToken);

        return transacao.ToDto(); // TransacaoMappings
    }
}
