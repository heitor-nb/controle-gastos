using System;

namespace WebApi.Application.Shared.Dtos;

public record CategoriaDto(
    string Id,
    DateTime CriadoEm,
    string Descricao,
    string Finalidade
);
