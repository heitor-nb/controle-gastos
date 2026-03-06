using System;
using WebApi.Domain.Exceptions;

namespace WebApi.Domain.ValueObjects;

public class Descricao
{
    public Descricao(string valor) => EditarValor(valor);

    public string Valor { get; private set; } = null!;

    public void EditarValor(
        string valor
    )
    {   
        if(string.IsNullOrWhiteSpace(valor)) throw new DomainException("A descrição informada não pode ser vazia.");

        if(valor.Length > 400) throw new DomainException("A descrição informada pode ter, no máximo, 400 caracteres.");

        Valor = valor;
    }
}
