using System;
using WebApi.Domain.Enums;
using WebApi.Domain.Exceptions;
using WebApi.Domain.ValueObjects;

namespace WebApi.Domain.Entities;

public class Transacao : BaseEntity
{
    public Transacao(
        Descricao descricao,
        decimal valor,
        string tipo,
        Categoria categoria,
        Pessoa pessoa
    )
    {
        Editar(
            descricao,
            valor,
            tipo,
            categoria,
            pessoa
        );
    }

    protected Transacao() { } // Construtor sem parâmetros para o funcionamento do EF.

    public Descricao Descricao { get; private set; } = null!;
    public decimal Valor { get; private set; }
    public string Tipo { get; private set; } = null!;
    public Categoria Categoria { get; private set; } = null!;
    public Guid CategoriaId { get; private set; }
    public Pessoa Pessoa { get; private set; } = null!;
    public Guid PessoaId { get; private set; }


    /*

    A entidade Transação tem muitas propriedades, então há um único método de edição.
    Como nenhuma propriedade pode ter o valor igual a null, se o parâmetro correspondente
    à propriedade for null, o método não edita essa propriedade.
    obs.: o construtor garante que todas as propriedades sejam inicializadas.
    
    */

    public void Editar(
        Descricao? descricao = null,
        decimal? valor = null,
        string? tipo = null,
        Categoria? categoria = null,
        Pessoa? pessoa = null
    )
    {
        if(descricao != null) Descricao = descricao;

        if(valor != null)
        {
            if(valor <= 0) throw new DomainException("O valor informado deve ser positivo.");

            Valor = (decimal)valor;
        }

        if(tipo != null)
        {
            if(!Enum.TryParse<Tipo>(tipo, out _)) throw new DomainException("O tipo informado não é válido");

            Tipo = tipo;
        }

        var ambos = Finalidade.ambos.ToString();
        var despesa = Enums.Tipo.despesa.ToString();

        // Garante coerência entre o tipo da transação e a finalidade da categoria.

        if(categoria != null)
        {   
            if(!categoria.Finalidade.Equals(ambos) && !categoria.Finalidade.Equals(tipo)) throw new DomainException($"A categoria informada deve ter a finalidade {ambos} ou {tipo}.");

            Categoria = categoria;
            CategoriaId = categoria.Id;
        }

        // Garante que uma pessoa menor de idade não seja associada a uma transação do tipo receita.

        if(pessoa != null)
        {
            if(pessoa.Idade < 18 && !Tipo.Equals(despesa)) throw new DomainException($"Apenas transações do tipo {despesa} são aceitas de menores de idade.");

            Pessoa = pessoa;
            PessoaId = pessoa.Id; 
        }
    }
}
