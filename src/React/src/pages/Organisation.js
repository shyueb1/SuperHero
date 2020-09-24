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
import AddOrganisationForm from "../components/AddOrganisationForm";
import TableOrganisation from "../components/TableOrganisation";

const SERVICE_URL = "http://localhost:8090/";

class Organisation extends React.Component {
    state = {
        loading: false,
        organisations: [
            {
                "name": "",
                "description": "",
                "location": {
                    "id": 1,
                    "name": "",
                    "description": "",
                    "address": "",
                    "latitude": 2.0,
                    "longitute": 1.0
                },
                "telephone": ""
            }
        ]
    };

    componentDidMount() {
        console.log("App is now mounted");
        this.loadOrganisations();
    }

    loadOrganisations() {
        this.setState({ loading: true });
        console.log("Loading organisations");
        fetch(SERVICE_URL + "organisation")
            .then(data => data.json())
            .then(data => this.setState(
                { organisations: data, loading: false }
            ));
    }

    handleDeleteOrganisation = (event) => {
        if (event) {
            event.preventDefault();
        }
        let organisationId = event.target.value;
        console.log(`Submitting delete for organisation id ${organisationId}`)
        fetch(SERVICE_URL + 'organisation', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "id": organisationId })
        })
            .then(data => { this.loadOrganisations(); })
            .catch(error => { console.error('Error: ', error); });
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
                            <AddOrganisationForm />
                        </Row>
                        <Row>
                            <TableOrganisation organisations={this.state.organisations}
                                handleDelete={this.handleDeleteOrganisation} />
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

export default Organisation;