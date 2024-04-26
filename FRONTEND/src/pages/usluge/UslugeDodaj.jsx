import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import UslugaService from '../../services/UslugaService';

export default function UslugeDodaj() {
  const navigate = useNavigate();

  async function dodaj(usluga) {
    const odgovor = await UslugaService.post(usluga);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert('Pogledaj konzolu');
      return;
    }
    navigate(RoutesNames.USLUGA_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    const usluga = {
      naziv: podaci.get('naziv'),
      opis: podaci.get(podaci.get('opis')),
      cijena: parseFloat(podaci.get('cijena')),
      verificiran: podaci.get('verificiran') == 'on' ? true : false,
    };

    dodaj(usluga);
  }

  return (
    <Container>
      <Form onSubmit={obradiSubmit}>
        <Form.Group controlId='naziv'>
          <Form.Label>Naziv</Form.Label>
          <Form.Control
            type='text'
            name='naziv'
            required
          />
        </Form.Group>

        <Form.Group controlId='opis'>
          <Form.Label>Opis</Form.Label>
          <Form.Control
            type='text'
            name='opis'
          />
        </Form.Group>

        <Form.Group controlId='cijena'>
          <Form.Label>Cijena</Form.Label>
          <Form.Control
            type='text'
            name='cijena'
          />
        </Form.Group>

        <Form.Group controlId='verificiran'>
          <Form.Check
            label='Verificiran'
            name='verificiran'
          />
        </Form.Group>

        <hr />
        <Row>
          <Col
            xs={6}
            sm={6}
            md={3}
            lg={6}
            xl={1}
            xxl={2}
          >
            <Link
              className='btn btn-danger siroko'
              to={RoutesNames.USLUGA_PREGLED}
            >
              Odustani
            </Link>
          </Col>
          <Col
            xs={6}
            sm={6}
            md={9}
            lg={6}
            xl={1}
            xxl={10}
          >
            <Button
              className='siroko'
              variant='primary'
              type='submit'
            >
              Dodaj
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
