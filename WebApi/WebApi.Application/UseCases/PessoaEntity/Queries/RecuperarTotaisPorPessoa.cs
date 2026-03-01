using System;
using MediatR;
using WebApi.Application.Shared.Dtos;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Application.UseCases.PessoaEntity.Queries;

public class RecuperarTotaisPorPessoaRequest(
    // int PageNumber // Caso fosse necessário implementar paginação.
) : IRequest<TotaisPorPessoa>;

public class RecuperarTotaisPorPessoaHandler : IRequestHandler<RecuperarTotaisPorPessoaRequest, TotaisPorPessoa>
{
    private readonly IPessoaRepository _pessoaRepos;
    private readonly ITransacaoRepository _transacaoRepos;

    public RecuperarTotaisPorPessoaHandler(
        IPessoaRepository pessoaRepos,
        ITransacaoRepository transacaoRepos
    )
    {
        _pessoaRepos = pessoaRepos;
        _transacaoRepos = transacaoRepos;
    }
    
    public async Task<TotaisPorPessoa> Handle(RecuperarTotaisPorPessoaRequest request, CancellationToken cancellationToken)
    {
        var pessoas = await _pessoaRepos.RecuperarTodosAsync(cancellationToken);

        List<TotaisPessoa> totaisPessoas = [];

        foreach(var p in pessoas)
        {   
            /*

            Em vez de carregar as entidades transações associadas completas na memória
            e depois calcular os totais da pessoa no código, pode-se performar essa
            operação no próprio banco de dados (que é mais eficiente p/ isso).

            */

            var (Receitas, Despesas) = await _transacaoRepos.RecuperarTotaisPorPessoaIdAsync(p.Id, cancellationToken);

            totaisPessoas.Add(new(
                p.Id.ToString(),
                p.Nome,
                p.Idade,
                Receitas,
                Despesas,
                Receitas - Despesas
            ));
        }

        var receitasTotais = totaisPessoas.Sum(t => t.Receitas);
        var despesasTotais = totaisPessoas.Sum(t => t.Despesas);

        return new(
            totaisPessoas,
            receitasTotais,
            despesasTotais,
            receitasTotais - despesasTotais
        );
    }
}