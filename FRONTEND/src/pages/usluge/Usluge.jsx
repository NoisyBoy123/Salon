import { useEffect, useState } from "react";
import UslugaService from "../../services/UslugaService";
import Container from "react-bootstrap/Container";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import backgroundImage from "../woman.jpg"; 


export default function Usluge() {
  const [usluge, setUsluge] = useState();
  const navigate = useNavigate();

  async function dohvatiUsluge() {
    await UslugaService.get()
      .then((odg) => {
        setUsluge(odg);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center", // This centers the background image
    minHeight: "100vh",
};

  useEffect(() => {
    dohvatiUsluge();
  }, []);

  async function obrisiAsync(sifra) {
    const odgovor = await UslugaService._delete(sifra);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert("Pogledaj konzolu");
      return;
    }
    dohvatiUsluge();
  }

  function obrisi(sifra) {
    obrisiAsync(sifra);
  }

 
  return (
    <div style={backgroundStyle}>

    <>

        <Container>
          <Link to={RoutesNames.USLUGA_NOVI}> Dodaj </Link>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Opis</th>
                <th>Cijena</th>
              </tr>
            </thead>
            <tbody>
              {usluge &&
                usluge.map((usluga, index) => (
                  <tr key={index}>
                    <td>{usluga.naziv}</td>
                    <td>{usluga.opis}</td>
                    <td>{usluga.cijena}</td>
                    <td>
                      <Button
                        onClick={() => obrisi(usluga.sifra)}
                        variant="danger"
                      >
                        Obriši
                      </Button>
                      <Button
                        onClick={() => {
                          navigate(`/usluga/${usluga.sifra}`);
                        }}
                      >
                        Promjeni
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
    </>
    </div>

  );
}
