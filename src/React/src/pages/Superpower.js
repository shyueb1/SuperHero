import React, { Component } from "react";
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
import AddCharacterForm from "../components/AddCharacterForm";
import TableCharacter from "../components/TableCharacter";

const SERVICE_URL = "http://localhost:8090/";

class Superpower extends Component {
    state = {
        loading: false,
        superpowers: [
            {
                "id": 1,
                "name": "Bob",
                "description": "A great super hero",
                "superpower": "Can fly",
                "heroOrVillain": "Hero",
                "organisations": ["Organisation 1", "Organisation 2"]
            }
        ]
    };

    loadSuperpowers() {
        this.setState({ loading: true });
        console.log("Loading characters");
        fetch(SERVICE_URL + "hero")
            .then(data => data.json())
            .then(data => this.setState(
                { characters: data, loading: false }
            ));
    }

    render() {
        return (
            <Container fluid style={{ padding: 0 }}>
                {/* <Container fluid> */}
                <Header />

                <Row>
                    <Col sm={3}>
                        <Sidebar />
                    </Col>

                    <Col sm={9}>
                        <Row>
                            <AddCharacterForm />
                        </Row>
                        <Row>
                            <TableCharacter characters={this.state.characters} />
                        </Row>

                    </Col>
                </Row>

                <Modal.Footer>
                    <Footer />
                </Modal.Footer>
            </Container>
        );
    }
}

export default Character;