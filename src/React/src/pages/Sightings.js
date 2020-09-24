import React from "react";
import {
    Container,
    Row,
    Col,
    Modal
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import AddSightingForm from '../components/AddSightingForm';
import TableSighting from '../components/TableSighting';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";


const SERVICE_URL = "http://localhost:8090/";

class Sightings extends React.Component {
    state = {
        loading: false,
        sightings: [{
            "hero": {
                "id": 0,
                "name": "",
                "description": "",
                "superpower": {
                    "id": 2,
                    "name": "flying",
                    "description": "You can fly like a bird"
                },
                "villain": false,
                "inOrganisation": []
            },
            "location": {
                "id": 1,
                "name": "",
                "description": "",
                "address": "",
                "latitude": 2.0,
                "longitute": 1.0
            },
            "date": "2020-01-01"
        }]

    };

    componentDidMount() {
        console.log("App is now mounted");
        this.loadSightings();
    }

    loadSightings() {
        this.setState({ loading: true });
        console.log("Loading sightings");
        fetch(SERVICE_URL + "sighting")
            .then(data => data.json())
            .then(data => this.setState(
                { sightings: data, loading: false }
            ));
    }

    handleDeleteSighting = (event) => {
        if (event) {
            event.preventDefault();
        }
        let sightingId = event.target.value;
        console.log(`Submitting delete for sighting id ${sightingId}`)
        fetch(SERVICE_URL + 'sightings', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "id": sightingId })
        })
            .then(data => { this.loadSightings(); })
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
                            <AddSightingForm />
                        </Row>
                        <Row>
                            <TableSighting sightings={this.state.sightings}
                                handleDelete={this.handleDeleteSighting} />
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

export default Sightings;