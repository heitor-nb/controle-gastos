using System;

namespace WebApi.Application.Shared.Dtos;

public record TransacaoDto(
    string Id,
    string Descricao,
    decimal Valor,
    string Tipo,
    string Categoria,
    string PessoaId
);
