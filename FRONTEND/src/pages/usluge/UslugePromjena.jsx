import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import backgroundImage from "/woman.jpg";


import { useEffect, useState } from "react";
import UslugaService from "../../services/UslugaService";
export default function UslugaPromjena() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [usluga, setUsluga] = useState({});

    async function dohvatiUslugu() {
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
        dohvatiUslugu();
    }, []);

    function obradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        const usluga = {
            naziv: podaci.get('naziv'),
            opis: podaci.get('opis'),
            cijena: podaci.get('cijena')
        };

        promjeni(usluga);
    }
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // This centers the background image
        minHeight: "100vh",
    };

    return (
        <div style={backgroundStyle}>

            <Container>
                <Form onSubmit={obradiSubmit}>

                    <Form.Group controlId="naziv">
                        <Form.Label>Naziv</Form.Label>
                        <Form.Control
                            type="text"
                            name="naziv"
                            defaultValue={usluga.naziv}
                            required />
                    </Form.Group>

                    <Form.Group controlId="opis">
                        <Form.Label>Opis</Form.Label>
                        <Form.Control
                            type="text"
                            name="opis"
                            defaultValue={usluga.opis}
                        />
                    </Form.Group>

                    <Form.Group controlId="cijena">
                        <Form.Label>Cijena</Form.Label>
                        <Form.Control type="text" name="cijena" defaultValue={usluga.cijena} />
                    </Form.Group>

                    <hr />
                    <Row>
                        <Col>
                            <Link className="btn btn-danger siroko" to={RoutesNames.USLUGA_PREGLED}>
                                Odustani
                            </Link>
                        </Col>
                        <Col>
                            <Button className="siroko" variant="primary" type="submit">
                                Promjeni
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </Container>
            </div>

    );
}
