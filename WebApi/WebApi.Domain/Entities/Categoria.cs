using System;
using WebApi.Domain.Enums;
using WebApi.Domain.Exceptions;
using WebApi.Domain.ValueObjects;

namespace WebApi.Domain.Entities;

public class Categoria : BaseEntity
{
    public Categoria(
        Descricao descricao,
        string finalidade
    )
    {
        Descricao = descricao;
        EditarFinalidade(finalidade);
    }

    protected Categoria() { } // Construtor sem parâmetros para o funcionamento do EF.

    private readonly List<Transacao> _transacoes = [];

    public Descricao Descricao { get; private set; } = null!;
    public string Finalidade { get; set; } = null!;

    // Propriedade de navegação.
    public IReadOnlyCollection<Transacao> Transacoes => _transacoes;

    public void EditarDescricao(Descricao descricao) => Descricao = descricao;

    public void EditarFinalidade(
        string finalidade
    )
    {
        if(!Enum.TryParse<Finalidade>(finalidade, out _)) throw new DomainException("A finalidade informada não é válida.");

        Finalidade = finalidade;
    }
}
