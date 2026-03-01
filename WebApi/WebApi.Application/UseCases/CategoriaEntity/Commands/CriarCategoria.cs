using System;
using MediatR;
using WebApi.Application.Shared.Dtos;
using WebApi.Application.Shared.Mappings;
using WebApi.Domain.Entities;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Domain.ValueObjects;

namespace WebApi.Application.UseCases.CategoriaEntity.Commands;

public record CriarCategoriaRequest(
    string Descricao,
    string Finalidade
) : IRequest<CategoriaDto>;

public class CriarCategoriaHandler : IRequestHandler<CriarCategoriaRequest, CategoriaDto>
{
    private readonly ICategoriaRepository _categoriaRepos;
    private readonly IUnitOfWork _unitOfWork;

    public CriarCategoriaHandler(
        ICategoriaRepository categoriaRepos,
        IUnitOfWork unitOfWork
    )
    {
        _categoriaRepos = categoriaRepos;
        _unitOfWork = unitOfWork;
    }

    public async Task<CategoriaDto> Handle(
        CriarCategoriaRequest request, 
        CancellationToken cancellationToken
    )
    {
        var descricao = new Descricao(request.Descricao);

        var categoria = new Categoria(
            descricao,
            request.Finalidade
        );

        await _categoriaRepos.CriarAsync(categoria, cancellationToken);
        await _unitOfWork.SalvarAsync(cancellationToken);

        return categoria.ToDto(); // CategoriaMappings
    }
}
