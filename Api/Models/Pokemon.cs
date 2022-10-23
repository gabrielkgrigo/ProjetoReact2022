using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace Api.Models
{
    public class Pokemon
    {
        [Key]
        public int id_pokemon { get; set; }

        [Required(ErrorMessage = "Um NÚMERO é necessário.")]
        public int numero { get; set; }

        [Required(ErrorMessage = "Um NOME é necessário.")]
        [StringLength(30, ErrorMessage = "O nome só pode ter até 30 caracteres.")]
        public string? nome { get; set; }

        [Required(ErrorMessage = "Um ELEMENTO é necessário.")]
        [Range(0, 99, ErrorMessage = "O ID do ELEMENTO só pode ter até 2 caracteres.")]
        public int id_elemento { get; set; }

        [Required(ErrorMessage = "Uma REGIÃO é necessário.")]
        [Range(0, 99, ErrorMessage = "O ID da REGIÃO só pode ter até 2 caracteres.")]
        public int id_regiao { get; set; }
    }
}