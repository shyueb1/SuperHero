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
            <Col>
                <Jumbotron fluid style={{ padding: 0 }}>
                    <h1 className="text-center" style={{ fontSize: 100 }}>
                        Superhero and Supervillain Sightings
              </h1>
                    <p className="text-center">A brief intro to this web app</p>
                </Jumbotron>
            </Col>
        </Row>
    );
}
export default Header;