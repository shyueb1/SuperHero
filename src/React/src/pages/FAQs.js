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
                <Col sm={3}>
                    <Sidebar />
                </Col>
                <Col sm={9}>
                    <h2>FAQs</h2>
                    <p>
                        Question:
                        </p>
                    <p>
                        Answer:
                        </p>

                    <p>
                        Question:
                        </p>
                    <p>
                        Answer:
                        </p>

                    <p>
                        Question:
                        </p>
                    <p>
                        Answer:
                        </p>

                    <p>
                        Question:
                        </p>
                    <p>
                        Answer:
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