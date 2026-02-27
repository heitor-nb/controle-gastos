using System;
using WebApi.Domain.Exceptions;

namespace WebApi.Domain.Entities;

public class Pessoa : BaseEntity
{
    public Pessoa(
        string nome,
        int idade
    )
    {
        EditarNome(nome);
        EditarIdade(idade);
    }

    protected Pessoa() { } // Construtor sem parâmetros para o funcionamento do EF.

    public string Nome { get; private set; } = null!;
    public int Idade { get; private set; }

    public void EditarNome(
        string nome
    )
    {
        if(nome.Length > 200) throw new DomainException("O nome informado pode ter, no máximo, 200 caracteres.");

        Nome = nome;
    }

    public void EditarIdade(
        int idade
    )
    {
        if(idade <= 0 || idade > 100) throw new DomainException("A idade informada deve estar no intervalo de 1 a 100.");

        Idade = idade;
    }
}
