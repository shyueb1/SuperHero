import React from "react";
import {
    Row,
    Col,
    Jumbotron,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
    return (
        <Row>
            <Col className="mr-0 ml-0 mb-0 mt-0">
                <Jumbotron fluid className="bg-primary mr-0 ml-0 mb-0 mt-0" style={{ padding: 10 }}>
                    <h1 className="text-center" style={{ fontSize: 100 }}>
                        Superhero and Supervillain Sightings
              </h1>
                </Jumbotron>
            </Col>
        </Row>
    );
}
export default Header;