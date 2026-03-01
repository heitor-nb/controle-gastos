using System;

namespace WebApi.Application.Shared.Dtos;

public record TotaisPessoa(
    string Id,
    string Nome,
    int Idade,
    decimal Receitas,
    decimal Despesas,
    decimal Saldo
);

public record TotaisPorPessoa(
    List<TotaisPessoa> TotaisPessoas,
    decimal ReceitasTotais,
    decimal DespesasTotais,
    decimal SaldoTotal
);
