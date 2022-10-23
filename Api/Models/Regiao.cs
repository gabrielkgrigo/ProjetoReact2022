using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace Api.Models
{
    public class Regiao
    {
        [Key]
        public int id_regiao { get; set; }

        [Required(ErrorMessage = "Um NOME é necessário.")]
        [StringLength(30, ErrorMessage = "O nome só pode ter até 30 caracteres.")]
        public string? nome { get; set; }
    }
}