using System;
using MediatR;
using WebApi.Application.Shared.Dtos;
using WebApi.Application.Shared.Mappings;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Application.UseCases.CategoriaEntity.Queries;

public record RecuperarCategoriasRequest(
    // int PageNumber // Caso fosse necessário implementar paginação.
) : IRequest<List<CategoriaDto>>;

public class RecuperarCategoriasHandler : IRequestHandler<RecuperarCategoriasRequest, List<CategoriaDto>>
{
    private readonly ICategoriaRepository _categoriaRepos;

    public RecuperarCategoriasHandler(
        ICategoriaRepository categoriaRepos
    )
    {
        _categoriaRepos = categoriaRepos;
    }

    public async Task<List<CategoriaDto>> Handle(
        RecuperarCategoriasRequest request, 
        CancellationToken cancellationToken
    )
    {
        var categorias = await _categoriaRepos.RecuperarTodosAsync(cancellationToken);

        return [.. categorias.Select(t => t.ToDto())];
    }
}

