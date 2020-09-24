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
import AddCharacterForm from "../components/AddCharacterForm";
import TableCharacter from "../components/TableCharacter";

const SERVICE_URL = "http://localhost:8090/";

class Character extends React.Component {
    state = {
        loading: false,
        characters: [
            {
                "id": 1,
                "name": "Bob",
                "description": "A great super hero",
                "superPower": {
                    "id": 2,
                    "name": "flying",
                    "description": "You can fly like a bird"
                },
                "villain": "",
                "inOrganisation": ["Organisation 1", "Organisation 2"]
            }
        ]
    };

    componentDidMount() {
        console.log("App is now mounted");
        this.loadCharacters();
    }

    loadCharacters() {
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
                    <Col sm={2}>
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