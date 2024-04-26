using Microsoft.AspNetCore.Mvc;
using Salon.Data;
using Salon.Models;

namespace Salon.Controllers
{
    

        [ApiController]
        [Route("api/v1/[controller]")]
        public class UslugaController : ControllerBase
        {

            private readonly SalonContext _context;


            public UslugaController(SalonContext context)
            {
                _context = context;
            }


            [HttpGet]
            public IActionResult Get()
            {
                return new JsonResult(_context.Usluge.ToList());
            }

            [HttpGet]
            [Route("{sifra:int}")]
            public IActionResult GetBySifra(int sifra)
            {
                return new JsonResult(_context.Usluge.Find(sifra));
            }



            [HttpPost]
            public IActionResult Post(Usluga usluga)
            {
                _context.Usluge.Add(usluga);
                _context.SaveChanges();
                return new JsonResult(usluga);
            }

            [HttpPut]
            [Route("{sifra:int}")]
            public IActionResult Put(int sifra, Usluga usluga)
            {
                var uslugaIzBaze = _context.Usluge.Find(sifra);

                uslugaIzBaze.Naziv = usluga.Naziv;
                uslugaIzBaze.Opis = usluga.Opis;
                uslugaIzBaze.Cijena = usluga.Cijena;


                _context.Usluge.Update(uslugaIzBaze);
                _context.SaveChanges();

                return new JsonResult(uslugaIzBaze);
            }

            [HttpDelete]
            [Route("{sifra:int}")]
            [Produces("application/json")]
            public IActionResult Delete(int sifra)
            {
                var smjerIzBaze = _context.Usluge.Find(sifra);
                _context.Usluge.Remove(smjerIzBaze);
                _context.SaveChanges();
                return new JsonResult(new { poruka = "Obrisano" });
            }



        }
    }
