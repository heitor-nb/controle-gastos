using System;

namespace WebApi.Domain.Entities;

public class BaseEntity
{   
    public BaseEntity()
    {
        Id = Guid.NewGuid();
        CriadoEm = DateTime.UtcNow;
    }

    public Guid Id { get; private set; }
    public DateTime CriadoEm { get; private set; }
}
