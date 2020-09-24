import React, { Component } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import AddLocationFrom from "../components/AddLocationForm";
import TableLocation from "../components/TableLocation";

const SERVICE_URL = "http://localhost:8090";

class Location extends Component {
    state = {
        isLoading: false,
        locations: [
            {
                id: 1,
                name: "Street",
                description: "Next to HSBC bank",
                address: "10 Charington Street, London, UK",
                latitude: 50.21,
                longitude: -0.13,
            },
            {
                id: 1,
                name: "Street Fake ",
                description: "Fake description",
                address: "Fake address",
                latitude: 50.21,
                longitude: -0.13,
            },
        ],
        submission: {
            name: "",
            description: "",
            address: "",
            latitude: undefined,
            longitude: undefined,
        },
    };

    componentDidMount() {
        console.log("App is now mounted");
        this.loadLocations();
    }

    loadLocations() {
        this.setState({ isLoading: true });
        console.log("Loading locations");
        fetch(SERVICE_URL + "/location")
            .then((response) => response.json())
            .then((data) => this.setState({ locations: data, isLoading: false }));
    }

    // handleEditModalOpen = (event) => {
    //   console.log("Opening Edit Modal");
    //   if (event) event.preventDefault();

    //   let id = event.target.value;
    // };

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
                address: "",
                latitude: undefined,
                longitude: undefined,
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
                            <AddLocationFrom
                                locations={this.state.locations}
                                validationForm={this.handleValidateForm}
                                clearFrom={this.handleClearForm}
                                submitForm={this.handleSubmitForm}
                            />
                        </Row>
                        <Row>
                            <TableLocation />
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

export default Location;
