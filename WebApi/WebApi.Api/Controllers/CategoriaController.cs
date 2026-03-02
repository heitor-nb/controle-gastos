using System;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebApi.Application.UseCases.CategoriaEntity.Commands;
using WebApi.Application.UseCases.CategoriaEntity.Queries;

namespace WebApi.Api.Controllers;

[ApiController]
[Route("categoria")]
public class CategoriaController : ControllerBase
{
    private readonly IMediator _mediator;

    public CategoriaController(
        IMediator mediator
    )
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Criar(
        [FromBody] CriarCategoriaRequest request
    )
    {
        var categoriaCriada = await _mediator.Send(request);

        return Created("/recuperar-todas", categoriaCriada);
    }

    [HttpGet("recuperar-todas")]
    public async Task<IActionResult> RecuperarTodas()
    {
        var request = new RecuperarCategoriasRequest();
        var categorias = await _mediator.Send(request);

        return Ok(categorias);
    }

    [HttpGet("recuperar-totais-por-categoria")]
    public async Task<IActionResult> RecuperarTotaisPorCategoria()
    {
        var request = new RecuperarTotaisPorCategoriaRequest();
        var totaisPorCategoria = await _mediator.Send(request);

        return Ok(totaisPorCategoria);
    }
}
