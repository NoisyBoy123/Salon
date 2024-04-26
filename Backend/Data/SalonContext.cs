using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Salon.Models;

namespace Salon.Data
{
    public class SalonContext : DbContext
    {
        public SalonContext(DbContextOptions<SalonContext> options) : base(options) { }

        public DbSet<Usluga> Usluge { get; set; }



    }
}
