import React, { Component } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import AddSuperpowerForm from "../components/AddSuperpowerForm";
import TableSuperpower from "../components/TableSuperPower";
import EditModalSuperpower from "../components/EditModalSuperpower";

const SERVICE_URL = "http://localhost:8090";

class Superpower extends Component {
    state = {
        isLoading: false,
        showEditModal: false,
        superpowers: [
            {
                id: 1,
                name: "Invisible",
                description: "Can be invisible for an hour without break",
            },
        ],
        submission: {
            name: "",
            description: "",
        },
        editSuperpower: {
            id: 99,
            name: "editName",
            description: "editDescription",
        },
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

    handleEditModalOpen = (event) => {
        console.log("Opening Edit Modal");
        if (event) {
            event.preventDefault();
        }
        let id = event.target.value;
        console.log(`Editing superpower ID: ${id}`);

        fetch(SERVICE_URL + "/superpower/" + id)
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                this.setState({ editSuperpower: data, showEditModal: true });
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    handleEditModalClose = (event) => {
        console.log("Closing Edit Modal");
        this.setState({ showEditModal: false });
    };

    handleEditFormChange = (event) => {
        let inputName = event.target.name;
        let inputValue = event.target.value;
        let superpowerInfo = this.state.editSuperpower;

        console.log(`Something changed in ${inputName} : ${inputValue}`);

        if (superpowerInfo.hasOwnProperty(inputName)) {
            superpowerInfo[inputName] = inputValue;
            this.setState({ editSuperpower: superpowerInfo });
        }
    };

    handleEditFormSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        let id = event.target.value;
        console.log(`Submitting edit for superpower ID: ${id}`);
        console.log(this.state.editSuperpower);

        fetch(SERVICE_URL + "/superpower/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.editSuperpower),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                this.setState({ showEditModal: false });
                this.loadSuperpowers();
            })
            .catch((error) => {
                console.log("Error:", error);
            });
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
                            <TableSuperpower
                                superpowers={this.state.superpowers}
                                handleEdit={this.handleEditModalOpen}
                            />
                        </Row>
                    </Col>
                </Row>

                <EditModalSuperpower
                    superpower={this.state.editSuperpower}
                    showModal={this.state.showEditModal}
                    handleClose={this.handleEditModalClose}
                    handleChange={this.handleEditFormChange}
                    handleSubmit={this.handleEditFormSubmit}
                />
                <Modal.Footer>
                    <Footer />
                </Modal.Footer>
            </Container>
        );
    }
}

export default Superpower;
