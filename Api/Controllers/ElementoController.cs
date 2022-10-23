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
    public class ElementoController : ControllerBase
    {

        private PokemonContext _context;
        public ElementoController(PokemonContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Elemento>> GetAll() {
            return _context.Elemento.ToList();
        }

        [HttpGet("{ElementoId}")]
        public ActionResult<List<Elemento>> Get(int ElementoId)
        {
            try
            {
                var result = _context.Elemento.Find(ElementoId);
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
        public async Task<ActionResult> post(Elemento model)
        {
            try
            {
                _context.Elemento.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Elemento/{model.id_elemento}",model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{ElementoId}")]
        public async Task<IActionResult> put(int ElementoId, Elemento dadosElementoAlt)
        {
            try {
                //verifica se existe Elemento a ser alterado
                var result = await _context.Elemento.FindAsync(ElementoId);
                if (ElementoId != result.id_elemento)
                {   
                    return BadRequest();
                }
                result.nome = dadosElementoAlt.nome;
                await _context.SaveChangesAsync();
                return Created($"/api/Pokemon/{dadosElementoAlt.id_elemento}", dadosElementoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{ElementoId}")]
        public async Task<ActionResult> delete(int ElementoId)
        {
            try
            {
                //verifica se existe Elemento a ser excluído
                var Elemento = await _context.Elemento.FindAsync(ElementoId);
                if (Elemento == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(Elemento);
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