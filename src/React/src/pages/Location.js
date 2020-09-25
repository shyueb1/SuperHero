import React, { Component } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import AddLocationFrom from "../components/AddLocationForm";
import TableLocation from "../components/TableLocation";
import EditModalLocation from "../components/EditModalLocation";

const SERVICE_URL = "http://localhost:8090/";

class Location extends Component {
  state = {
    isLoading: false,
    showEditModal: false,
    locations: [
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
      latitude: 0.0,
      longitude: 0.0,
    },
    editLocation: {
      id: 99,
      name: "Edit Street Fake ",
      description: "Edit Fake description",
      address: "Fake address",
      latitude: 50.21,
      longitude: -0.13,
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
        latitude: 0.0,
        longitude: 0.0,
      },
    });
    console.log("submission form cleared");
  };

  handleSubmitForm = (values) => {
    let subMission = {
      "name": values.name,
      "description": values.description,
      "address": values.address,
      "latitude": values.latitude,
      "longitude": values.longitude
    };
    fetch(SERVICE_URL + "/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subMission),
    })
      .then(response => response.json())
      .then(data => {
        this.loadLocations();
      })
      .catch(error => {
        console.log("Error:", error);
      });
  };

  handleEditModalOpen = (event) => {
    console.log("Opening Edit Modal");
    if (event) {
      event.preventDefault();
    }
    let id = event.target.value;
    console.log(`Editing location ID: ${id}`);

    fetch(SERVICE_URL + "/location/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.setState({ editLocation: data, showEditModal: true });
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
    let locationInfo = this.state.editLocation;

    console.log(`Something changed in ${inputName} : ${inputValue}`);

    if (locationInfo.hasOwnProperty(inputName)) {
      locationInfo[inputName] = inputValue;
      this.setState({ editLocation: locationInfo });
    }
  };

  handleEditFormSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    let id = event.target.value;
    console.log(`Submitting edit for location ID: ${id}`);
    console.log(this.state.editLocation);

    fetch(SERVICE_URL + "location/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.editLocation),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.setState({ showEditModal: false });
        this.loadLocations();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  handleDeleteLocation = (event) => {
    if (event) {
      event.preventDefault();
    }
    let locationId = event.target.value;
    console.log(`Submitting delete for location id ${locationId}`);
    fetch(SERVICE_URL + "location", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: locationId }),
    })
      .then((data) => {
        this.loadLocations();
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  render() {
    return (
      <Container fluid style={{ padding: 0 }}>
        <Header />

        <Row>
          <Col sm={2} style={{ backgroundColor: "AliceBlue" }}>
            <Sidebar />
          </Col>

          <Col sm={9} style={{ padding: 50 }}>
            <Row>
              <AddLocationFrom
                submission={this.state.submission}
                validationForm={this.handleValidateForm}
                clearFrom={this.handleClearForm}
                submitForm={this.handleSubmitForm}
              />
            </Row>
            <hr />
            <Row>
              <TableLocation
                locations={this.state.locations}
                handleEdit={this.handleEditModalOpen}
                handleDelete={this.handleDeleteLocation}
              />
            </Row>
          </Col>
        </Row>

        <EditModalLocation
          location={this.state.editLocation}
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

export default Location;
