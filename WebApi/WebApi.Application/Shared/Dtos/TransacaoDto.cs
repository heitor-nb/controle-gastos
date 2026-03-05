using System;

namespace WebApi.Application.Shared.Dtos;

public record TransacaoDto(
    string Id,
    DateTime CriadoEm,
    string Descricao,
    decimal Valor,
    string Tipo,
    string Categoria,
    string PessoaId
);
