using System;
using WebApi.Application.Shared.Dtos;
using WebApi.Domain.Entities;

namespace WebApi.Application.Shared.Mappings;

public static class TransacaoMappings
{
    public static TransacaoDto ToDto(this Transacao transacao) => new(
        transacao.Id.ToString(),
        transacao.Descricao.Valor,
        transacao.Valor,
        transacao.Tipo,
        transacao.Categoria.Descricao.Valor,
        transacao.PessoaId.ToString()
    );
}
