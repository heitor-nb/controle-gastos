using System;

namespace WebApi.Domain.Interfaces.Repositories;

public interface IUnitOfWork
{
    Task SalvarAsync(CancellationToken ct);
}
