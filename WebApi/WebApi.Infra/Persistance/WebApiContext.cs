using System;
using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Entities;

namespace WebApi.Infra.Persistance;

public class WebApiContext : DbContext
{
    public WebApiContext(
        DbContextOptions<WebApiContext> options
    ) : base(options)
    {
        
    }

    public DbSet<Pessoa> Pessoas { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Transacao> Transacoes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {   
        var categoriaBuilder = modelBuilder.Entity<Categoria>();
        categoriaBuilder.OwnsOne(c => c.Descricao);
        categoriaBuilder
            .HasMany(c => c.Transacoes)
            .WithOne(t => t.Categoria)
            .HasForeignKey(t => t.CategoriaId);

        modelBuilder.Entity<Transacao>().OwnsOne(t => t.Descricao);

        base.OnModelCreating(modelBuilder);
    }
}
