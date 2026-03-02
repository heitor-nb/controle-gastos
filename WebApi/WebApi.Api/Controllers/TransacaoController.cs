using System;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebApi.Application.UseCases.TransacaoEntity.Commands;
using WebApi.Application.UseCases.TransacaoEntity.Queries;

namespace WebApi.Api.Controllers;

[ApiController]
[Route("transacao")]
public class TransacaoController : ControllerBase
{
    private readonly IMediator _mediator;

    public TransacaoController(
        IMediator mediator
    )
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Criar(
        [FromBody] CriarTransacaoRequest request
    )
    {
        var transacaoCriada = await _mediator.Send(request);

        return Created("/recuperar-todas", transacaoCriada);
    }

    [HttpGet("recuperar-todas")]
    public async Task<IActionResult> RecuperarTodas()
    {
        var request = new RecuperarTransacoesRequest();
        var transacoes = await _mediator.Send(request);

        return Ok(transacoes);
    }
}
