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

function FAQs() {
    return (
        <Container fluid style={{ padding: 0 }}>
            <Header />
            <Row>
                <Col sm={3} style={{ backgroundColor: "AliceBlue" }}>
                    <Sidebar />
                </Col>
                <Col sm={9} style={{ padding: 50 }}>
                    <h2>FAQs</h2>
                    <hr />
                    <p>
                        <h4>Question:</h4> Where do I view the most recent superhero and supervillain sightings?
                        </p>
                    <p>
                        <h4>Answer:</h4> You can view the Top 10 Most Recent Sightings on the Home page! If you're near any of those locations then maybe you can pay them a visit...
                        </p>
                    <hr />
                    <p>
                        <h4>Question:</h4> How do I log my own superhero sighting?
                        </p>
                    <p>
                        <h4>Answer:</h4> On the Sightings page you can view all the logged sightings in a table and you can also fill in the form to add your own sighting to the database. Don't forget to add the superhero or supervillain and location to the database first if they are not already logged!
                        </p>
                    <hr />
                    <p>
                        <h4>Question:</h4> Show me the superpowers!!!!
                        </p>
                    <p>
                        <h4>Answer:</h4>You can see all known superpowers to the Hero Education and Relationship Organisation on the superpowers page. If you think you have found a new superpower then you can also fill out the form to add a new one to the database.
                        </p>

                </Col>
            </Row>
            <Modal.Footer>
                <Footer />
            </Modal.Footer>
        </Container>
    );
}

export default FAQs;