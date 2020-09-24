import React from "react";
import {
    Container,
    Row,
    Col,
    Modal
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

function AboutUs() {
    return (
        <Container fluid style={{ padding: 0 }}>
            <Header />
            <Row>
                <Col sm={3}>
                    <Sidebar />
                </Col>
                <Col sm={9}>
                    <h2>About Us</h2>
                    <hr />
                    <p>
                        A superhero and supervillain sighting application by Ann Gurung, Dani Sithirangathan, Shyueb Sediqi and Megan Halpin.
                        </p>
                    <p>
                        This application was requested by the Hero Education and Relationship Organisation.
                        </p>
                    <p>
                        We are here for all your superhero and supervillain needs. Find out the most recent sightings, log your own sightings and view all the superheroes, supervillains, superpowers, locations and organisations in the Hero Education database.
                        </p>
                </Col>
            </Row>
            <Modal.Footer>
                <Footer />
            </Modal.Footer>
        </Container>
    );
}

export default AboutUs;