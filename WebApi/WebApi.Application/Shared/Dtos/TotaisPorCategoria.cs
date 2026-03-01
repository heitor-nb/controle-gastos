using System;

namespace WebApi.Application.Shared.Dtos;

public record TotaisCategoria(
    string Id,
    string Descricao,
    string Finalidade,
    decimal Receitas,
    decimal Despesas,
    decimal Saldo
);

public record TotaisPorCategoria(
    List<TotaisCategoria> TotaisCategorias,
    decimal ReceitasTotais,
    decimal DespesasTotais,
    decimal SaldoTotal
);
