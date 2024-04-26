import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import UslugaService from '../../services/UslugaService';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';

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

  useEffect(() => {
    dohvatiUsluge();
  }, []);

  function formatirajVerificiran(v) {
    if (v == null) {
      return 'nije definirano';
    }

    if (v) {
      return 'DA';
    }

    return 'NE';
  }

  async function obrisiAsync(sifra) {
    const odgovor = await UslugaService._delete(sifra);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert('Pogledaj konzolu');
      return;
    }
    dohvatiUsluge();
  }

  function obrisi(sifra) {
    obrisiAsync(sifra);
  }

  return (
    <>
      <Container>
        <Link to={RoutesNames.USLUGA_NOVI}> Dodaj </Link>
        <Table
          striped
          bordered
          hover
          responsive
        >
          <thead>
            <tr>
              <th>Naziv</th>
              <th>Opis</th>
              <th>Cijena</th>
              <th>Akcija</th>
            </tr>
          </thead>
          <tbody>
            {usluge &&
              usluge.map((usluga, index) => (
                <tr key={index}>
                  <td>{usluga.naziv}</td>
                  <td>{usluga.opis}</td>
                  <td>{usluga.cijena}</td>
                  <td>{formatirajVerificiran(usluga.verificiran)}</td>
                  <td>
                    <Button
                      onClick={() => obrisi(usluga.sifra)}
                      variant='danger'
                    >
                      Obriši
                    </Button>

                    <Button
                      onClick={() => {
                        navigate(`/usluge/${usluga.sifra}`);
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
  );
}
