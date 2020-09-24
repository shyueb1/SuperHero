import React, { Component } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import AddSuperpowerForm from "../components/AddSuperpowerForm";
import TableSuperpower from "../components/TableSuperPower";

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

    handleValidateForm = (values) => {
        let errors = {};

        if (!values.name.length > 0) {
            errors.name = "Name is required";
        }
        if (!values.description.length > 0) {
            errors.description = "Description is required";
        }
        return errors;
    };

    handleClearForm = (values) => {
        this.setState({
            submission: {
                name: "",
                description: "",
            },
        });
        console.log("submission form cleared");
    };

    handleSubmitForm = (values, { setSubmitting }) => {
        const submission = values;
        alert(JSON.stringify(submission, null, 2));
        console.log("submitted submission: " + JSON.stringify(submission));
        setSubmitting(false);
    };

    render() {
        return (
            <Container fluid style={{ padding: 0 }}>
                <Header />

                <Row>
                    <Col sm={2}>
                        <Sidebar />
                    </Col>

                    <Col sm={9}>
                        <Row>
                            <AddSuperpowerForm
                                submission={this.state.submission}
                                validationForm={this.handleValidateForm}
                                clearFrom={this.handleClearForm}
                                submitForm={this.handleSubmitForm}
                            />
                        </Row>
                        <Row>
                            <TableSuperpower superpowers={this.state.superpowers} />
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
