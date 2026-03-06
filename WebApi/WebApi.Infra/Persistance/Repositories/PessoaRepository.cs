using System;
using Microsoft.EntityFrameworkCore;
using WebApi.Application.Shared.Exceptions;
using WebApi.Domain.Entities;
using WebApi.Domain.Enums;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Infra.Persistance.Repositories;

public class PessoaRepository : BaseRepository<Pessoa>, IPessoaRepository
{
    public PessoaRepository(
        WebApiContext context
    ) : base(context)
    {
    }

    public new async Task CriarAsync(
        Pessoa pessoa, 
        CancellationToken ct
    )
    {
        /*

        A transaction permite performar diferentes operações de forma atômica no banco de dados.
        Esse recurso é essencial para evitar race conditions.

        */

        await using var transaction = await _context.Database.BeginTransactionAsync(ct);

        var existingPessoa = await _context.Pessoas.SingleOrDefaultAsync(p => p.Nome == pessoa.Nome, ct);
        if(existingPessoa != null) throw new AppException("O nome informado já é associado a uma pessoa.");

        await _context.Pessoas.AddAsync(pessoa, ct);
        await _context.SaveChangesAsync(ct);

        await transaction.CommitAsync(ct);
    }

    public async Task<Pessoa> EditarAsync(
        Guid id, 
        CancellationToken ct, 
        string? nome = null, 
        int? idade = null
    )
    {
        await using var transaction = await _context.Database.BeginTransactionAsync(ct);

        var pessoa = await RecuperarAsync(id, ct) ?? throw new NotFoundException("O ID informado não pertence a nenhuma pessoa.");

        // Se o nome informado já é associado a alguma pessoa, a edição não pode ser completada.

        if (!string.IsNullOrWhiteSpace(nome))
        {
            var existingPessoa = await _context.Pessoas.SingleOrDefaultAsync(p => p.Nome == nome, ct);
            if(existingPessoa != null && existingPessoa.Id != pessoa.Id) throw new AppException("O nome informado já é associado a uma pessoa.");

            pessoa.EditarNome(nome);
        }

        /*

        Se há alguma transação do tipo receita associada a essa pessoa, sua idade não pode ser menor que 18 anos.
        _context.Transacoes.AnyAsync(t => t.PessoaId == id && t.Tipo == Tipo.receita.ToString())
        verifica isso sem que as entidades transações precisem ser carregadas na memória.

        */

        if(idade != null)
        {   
            if(idade < 18 && await _context.Transacoes.AnyAsync(t => t.PessoaId == id && t.Tipo == Tipo.receita.ToString())) throw new AppException("A pessoa associada ao ID informado tem receitas, então não pode ser menor de idade.");

            pessoa.EditarIdade((int)idade);
        }

        await _context.SaveChangesAsync(ct);

        await transaction.CommitAsync(ct);

        return pessoa;
    }
}
