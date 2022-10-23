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
    public class RegiaoController : ControllerBase
    {

        private PokemonContext _context;
        public RegiaoController(PokemonContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Regiao>> GetAll() {
            return _context.Regiao.ToList();
        }

        [HttpGet("{RegiaoId}")]
        public ActionResult<List<Regiao>> Get(int RegiaoId)
        {
            try
            {
                var result = _context.Regiao.Find(RegiaoId);
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
        public async Task<ActionResult> post(Regiao model)
        {
            try
            {
                _context.Regiao.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Regiao/{model.id_regiao}",model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{RegiaoId}")]
        public async Task<IActionResult> put(int RegiaoId, Regiao dadosRegiaoAlt)
        {
            try {
                //verifica se existe Regiao a ser alterada
                var result = await _context.Regiao.FindAsync(RegiaoId);
                if (RegiaoId != result.id_regiao)
                {   
                    return BadRequest();
                }
                result.nome = dadosRegiaoAlt.nome;
                await _context.SaveChangesAsync();
                return Created($"/api/Pokemon/{dadosRegiaoAlt.id_regiao}", dadosRegiaoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{RegiaoId}")]
        public async Task<ActionResult> delete(int RegiaoId)
        {
            try
            {
                //verifica se existe Regiao a ser excluída
                var Regiao = await _context.Regiao.FindAsync(RegiaoId);
                if (Regiao == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(Regiao);
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