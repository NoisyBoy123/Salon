import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import UslugaService from '../../services/UslugaService';
import { useEffect, useState } from 'react';

export default function UslugePromjena() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [usluga, setUsluga] = useState({});

  async function dohvatiUsluga() {
    const o = await UslugaService.getBySifra(routeParams.sifra);
    if (o.greska) {
      console.log(o.poruka);
      alert('pogledaj konzolu');
      return;
    }
    setUsluga(o.poruka);
  }

  async function promjeni(usluga) {
    const odgovor = await UslugaService.put(routeParams.sifra, usluga);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert('Pogledaj konzolu');
      return;
    }
    navigate(RoutesNames.USLUGA_PREGLED);
  }

  useEffect(() => {
    dohvatiUsluga();
  }, []);

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    const usluga = {
      naziv: podaci.get('naziv'),
      opis: parseInt(podaci.get('opis')),
      cijena: parseFloat(podaci.get('cijena')),
      verificiran: podaci.get('verificiran') == 'on' ? true : false,
    };

    promjeni(usluga);
  }

  return (
    <Container>
      <Form onSubmit={obradiSubmit}>
        <Form.Group controlId='naziv'>
          <Form.Label>Naziv</Form.Label>
          <Form.Control
            type='text'
            name='naziv'
            defaultValue={usluga.naziv}
            required
          />
        </Form.Group>

        <Form.Group controlId='opis'>
          <Form.Label>opis</Form.Label>
          <Form.Control
            type='number'
            name='opis'
            defaultValue={usluga.opis}
          />
        </Form.Group>

        <Form.Group controlId='cijena'>
          <Form.Label>Cijena</Form.Label>
          <Form.Control
            type='text'
            name='cijena'
            defaultValue={usluga.cijena}
          />
        </Form.Group>

        <Form.Group controlId='verificiran'>
          <Form.Check
            label='Verificiran'
            name='verificiran'
            defaultChecked={usluga.verificiran}
          />
        </Form.Group>

        <hr />
        <Row>
          <Col>
            <Link
              className='btn btn-danger siroko'
              to={RoutesNames.USLUGA_PREGLED}
            >
              Odustani
            </Link>
          </Col>
          <Col>
            <Button
              className='siroko'
              variant='primary'
              type='submit'
            >
              Promjeni
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
