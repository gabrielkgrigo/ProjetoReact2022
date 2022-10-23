using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Api.Data;
using Api.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonController : ControllerBase
    {

        private PokemonContext _context;
        public PokemonController(PokemonContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Pokemon>> GetAll() {
            return _context.Pokemon.ToList();
        }

        [HttpGet("{PokemonId}")]
        public ActionResult<List<Pokemon>> Get(int PokemonId)
        {
            try
            {
                var result = _context.Pokemon.Find(PokemonId);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Pokemon model)
        {
            try
            {
                _context.Pokemon.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Pokemon/{model.numero}",model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{PokemonId}")]
        public async Task<IActionResult> put(int PokemonId, Pokemon dadosPokemonAlt)
        {
            try {
                //verifica se existe Pokemon a ser alterado
                var result = await _context.Pokemon.FindAsync(PokemonId);
                if (PokemonId != result.id_pokemon)
                {   
                    return BadRequest();
                }
                result.numero = dadosPokemonAlt.numero;
                result.nome = dadosPokemonAlt.nome;
                result.id_elemento = dadosPokemonAlt.id_elemento;
                result.id_regiao = dadosPokemonAlt.id_regiao;
                await _context.SaveChangesAsync();
                return Created($"/api/Pokemon/{dadosPokemonAlt.numero}", dadosPokemonAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{PokemonId}")]
        public async Task<ActionResult> delete(int PokemonId)
        {
            try
            {
                //verifica se existe Pokemon a ser excluído
                var Pokemon = await _context.Pokemon.FindAsync(PokemonId);
                if (Pokemon == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(Pokemon);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }
    }
}