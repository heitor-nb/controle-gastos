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

    public CriarCategoriaHandler(
        ICategoriaRepository categoriaRepos
    )
    {
        _categoriaRepos = categoriaRepos;
    }

    public async Task<CategoriaDto> Handle(
        CriarCategoriaRequest request, 
        CancellationToken cancellationToken
    )
    {   
        /*

        Na documentação, não é especificado que a descrição da categoria deve ser única.
        Mas eu considerei interessante que essa propriedade fosse única.
        obs.: a validação ocorre dentro da transaction do db.

        */

        var descricao = new Descricao(request.Descricao);

        var categoria = new Categoria(
            descricao,
            request.Finalidade
        );

        await _categoriaRepos.CriarAsync(categoria, cancellationToken);

        return categoria.ToDto(); // CategoriaMappings
    }
}
