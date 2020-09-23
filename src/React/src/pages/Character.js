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

const SERVICE_URL = "http://localhost:8090/";

class Character extends React.Component {
    state = {
        sightings: [
            {
                id: 1,
                hero: "Superman",
                location: "29 Wall Street",
                date: "2020-02-02",
            },
            {
                id: 1,
                hero: "Superman",
                location: "29 Wall Street",
                date: "2020-02-02",
            },
            {
                id: 1,
                hero: "Superman",
                location: "29 Wall Street",
                date: "2020-02-02",
            },
            {
                id: 1,
                hero: "Superman",
                location: "29 Wall Street",
                date: "2020-02-02",
            },
        ],
    };

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