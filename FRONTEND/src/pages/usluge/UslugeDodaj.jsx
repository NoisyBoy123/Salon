import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UslugaService from "../../services/UslugaService";
export default function UslugeDodaj() {
  const navigate = useNavigate();

  async function dodaj(usluga) {
    const odgovor = await UslugaService.post(usluga);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert("Pogledaj konzolu");
      return;
    }
    navigate(RoutesNames.USLUGA_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);

    const usluga = {
      naziv: podaci.get("naziv"),
      opis: podaci.get("opis"),
      cijena: podaci.get("cijena"),
    };

    dodaj(usluga);
  }

  
  return (
      <Container>
        <Form onSubmit={obradiSubmit}>
          <Form.Group controlId="naziv">
            <Form.Label className="white-text">Naziv</Form.Label>
            <Form.Control type="text" name="naziv" required />
          </Form.Group>

          <Form.Group controlId="opis">
            <Form.Label className="white-text">Opis</Form.Label>
            <Form.Control type="text" name="opis" />
          </Form.Group>

          <Form.Group controlId="cijena">
            <Form.Label className="white-text">Cijena</Form.Label>
            <Form.Control type="text" name="cijena" />
          </Form.Group>

          <hr />
          <Row>
            <Col>
              <Link
                className="btn btn-danger siroko"
                to={RoutesNames.USLUGA_PREGLED}
              >
                Odustani
              </Link>
            </Col>
            <Col>
              <Button className="siroko" variant="primary" type="submit">
                Dodaj
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    
  );
}
