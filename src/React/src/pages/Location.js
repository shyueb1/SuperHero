import React, { Component } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import SuperpowerForm from "../components/AddLocationForm";
import SuperpowerTable from "../components/AddLocationTable";

const SERVICE_URL = "http://localhost:8090";

class Superpower extends Component {
    state = {
        isLoading: false,
        superpowers: [
            {
                id: 1,
                name: "Invisible",
                description: "Can be invisible for an hour without break",
            },
            {
                id: 2,
                name: "Fake",
                description: "Fake fake",
            },
        ],
    };

    componentDidMount() {
        console.log("App is now mounted");
        this.loadSuperpowers();
    }

    loadSuperpowers() {
        this.setState({ isLoading: true });
        console.log("Loading superpowers");
        fetch(SERVICE_URL + "/superpower")
            .then((response) => response.json())
            .then((data) => this.setState({ superpowers: data, isLoading: false }));
    }

    handleEditModalOpen = (event) => {
        console.log("Opening Edit Modal");
        if (event) event.preventDefault();

        let id = event.target.value;
    };

    render() {
        return (
            <Container fluid style={{ padding: 0 }}>
                <Header />

                <Row>
                    <Col sm={3}>
                        <Sidebar />
                    </Col>

                    <Col sm={9}>
                        <Row>
                            <SuperpowerForm />
                        </Row>
                        <Row>
                            <SuperpowerTable superpowers={this.state.superpowers} />
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

export default Superpower;
