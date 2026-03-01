using System;

namespace WebApi.Application.Shared.Dtos;

public record CategoriaDto(
    string Id,
    string Descricao,
    string Finalidade
);
