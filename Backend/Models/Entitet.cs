using System.ComponentModel.DataAnnotations;

namespace Salon.Models
{
    public abstract class Entitet
    {
        [Key]
        public int Sifra { get; set; }
    }
}
