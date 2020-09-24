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
        ],
        locations: [
            {
                id: "",
                name: "",
                description: "",
                address: "",
                latitude: "",
                longitude: "",
            },
        ],
        allLocations: []
    };
    handleSubmitForm = (values) => {
        let subName = values.name;
        let subDescrip = values.description;
        let subLocation = values.location;
        let locationId;
        this.state.locations.forEach(l => {
            if (l.name === subLocation) {
                locationId = l.id;
            }
        });
        let subTelephone = values.telephone;
        let subMission = {
            "name": subName,
            "description": subDescrip,
            "location": {
                "id": locationId
            },
            "telephone": subTelephone
        };
        fetch(SERVICE_URL + "/organisation/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subMission),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                this.loadLocationsAndOrganisations();
            })
            .catch((error) => {
                console.log("Error:", error);
            });

    }

    componentDidMount() {
        console.log("App is now mounted");
        this.loadLocationsAndOrganisations();
    }

    loadLocationsAndOrganisations() {
        this.setState({ loading: true });
        console.log("Loading locations and organisations");
        Promise.all([fetch(SERVICE_URL + "location"), fetch(SERVICE_URL + "organisation")])
            .then(([response1, response2]) => {
                return Promise.all([response1.json(), response2.json()])
            })
            .then(([data1, data2]) => {
                this.setState({
                    locations: data1, loading: false,
                    organisations: data2, allLocations: data1.map(d => d.name)
                })
            });
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
            .then(data => { this.loadLocationsAndOrganisations(); })
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
                            <AddOrganisationForm
                                handleSubmitForm={this.handleSubmitForm}
                                allLocations={(this.state.allLocations)}
                                loadAll={this.loadLocationsAndOrganisations}
                                locations={this.state.locations} />
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