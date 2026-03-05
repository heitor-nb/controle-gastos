using System;
using WebApi.Application.Shared.Dtos;
using WebApi.Domain.Entities;

namespace WebApi.Application.Shared.Mappings;

public static class CategoriaMappings
{
    public static CategoriaDto ToDto(this Categoria categoria) => new (
        categoria.Id.ToString(),
        categoria.CriadoEm,
        categoria.Descricao.Valor,
        categoria.Finalidade
    );
}
