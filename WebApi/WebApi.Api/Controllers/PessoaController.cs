using System;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebApi.Application.UseCases.PessoaEntity.Commands;
using WebApi.Application.UseCases.PessoaEntity.Queries;

namespace WebApi.Api.Controllers;

[ApiController]
[Route("pessoa")]
public class PessoaController : ControllerBase
{
    private readonly IMediator _mediator;

    public PessoaController(
        IMediator mediator
    )
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Criar(
        [FromBody] CriarPessoaRequest request
    )
    {
        var pessoaCriada = await _mediator.Send(request);

        return Created("/recuperar-por-id", pessoaCriada);
    }

    [HttpGet("recuperar-por-id")]
    public async Task<IActionResult> RecuperarPorId(
        [FromQuery] string id
    )
    {
        var request = new RecuperarPessoaPorIdRequest(id);
        var pessoa = await _mediator.Send(request);

        return Ok(pessoa);
    }

    [HttpGet("recuperar-todas")]
    public async Task<IActionResult> RecuperarTodas()
    {
        var request = new RecuperarPessoasRequest();
        var pessoas = await _mediator.Send(request);

        return Ok(pessoas);
    }

    [HttpGet("recuperar-totais-por-pessoa")]
    public async Task<IActionResult> RecuperarTotaisPorPessoa()
    {
        var request = new RecuperarTotaisPorPessoaRequest();
        var totaisPorPessoa = await _mediator.Send(request);

        return Ok(totaisPorPessoa);
    }

    [HttpPatch]
    public async Task<IActionResult> Editar(
        [FromBody] EditarPessoaRequest request
    )
    {
        var pessoaEditada = await _mediator.Send(request);

        return Ok(pessoaEditada);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Deletar(
        [FromRoute] string id
    )
    {
        var request = new DeletarPessoaRequest(id);
        await _mediator.Send(request);

        return NoContent();
    }
}
