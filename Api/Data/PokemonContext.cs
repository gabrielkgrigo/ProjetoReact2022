using Microsoft.EntityFrameworkCore;
using Api.Models;
using System.Diagnostics.CodeAnalysis;

namespace Api.Data
{
    public class PokemonContext: DbContext
    {

        protected readonly IConfiguration Configuration;

        public PokemonContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
        }

        public DbSet<Pokemon> Pokemon {get; set;}
        public DbSet<Elemento> Elemento {get; set;}
        public DbSet<Regiao> Regiao {get; set;}
    }
}