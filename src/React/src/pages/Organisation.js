import React from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import AddOrganisationForm from "../components/AddOrganisationForm";
import TableOrganisation from "../components/TableOrganisation";
import EditModalOrganisation from "../components/EditModalOrganisation";

const SERVICE_URL = "http://localhost:8090/";

class Organisation extends React.Component {
  state = {
    loading: false,
    showEditModal: false,
    organisations: [
      {
        id: 1,
        name: "",
        description: "",
        location: {
          id: 1,
          name: "",
          description: "",
          address: "",
          latitude: 2.0,
          longitute: 1.0,
        },
        telephone: "",
      },
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

    editOrganisation: {
      id: 99,
      name: "",
      description: "",
      location: {
        id: 1,
        name: "",
        description: "",
        address: "",
        latitude: 0.0,
        longitute: 0.0,
      },
      telephone: "",
    },
    allLocations: [],
  };

  handleSubmitForm = (values) => {
    let subName = values.name;
    let subDescrip = values.description;
    let subLocation = values.location;
    let locationId;
    this.state.locations.forEach((l) => {
      if (l.name === subLocation) {
        locationId = l.id;
      }
    });
    let subTelephone = values.telephone;
    let subMission = {
      name: subName,
      description: subDescrip,
      location: {
        id: locationId,
      },
      telephone: subTelephone,
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
  };

  componentDidMount() {
    console.log("App is now mounted");
    this.loadLocationsAndOrganisations();
  }

  loadLocationsAndOrganisations() {
    this.setState({ loading: true });
    console.log("Loading locations and organisations");
    Promise.all([
      fetch(SERVICE_URL + "location"),
      fetch(SERVICE_URL + "organisation"),
    ])
      .then(([response1, response2]) => {
        return Promise.all([response1.json(), response2.json()]);
      })
      .then(([data1, data2]) => {
        this.setState({
          locations: data1,
          loading: false,
          organisations: data2,
          allLocations: data1.map((d) => d.name),
        });
      });
  }

  handleDeleteOrganisation = (event) => {
    if (event) {
      event.preventDefault();
    }
    let organisationId = event.target.value;
    console.log(`Submitting delete for organisation id ${organisationId}`);
    fetch(SERVICE_URL + "organisation", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: organisationId }),
    })
      .then((data) => {
        this.loadLocationsAndOrganisations();
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  handleEditModalOpen = (event) => {
    console.log("Opening Edit Modal");
    if (event) {
      event.preventDefault();
    }
    let id = event.target.value;
    console.log(`Editing organisation ID: ${id}`);

    fetch(SERVICE_URL + "organisation/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.setState({ editOrganisation: data, showEditModal: true });
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
    let organisationInfo = this.state.editOrganisation;

    console.log(`Something changed in ${inputName} : ${inputValue}`);

    if (organisationInfo.hasOwnProperty(inputName)) {
      organisationInfo[inputName] = inputValue;
      this.setState({ editOrganisation: organisationInfo });
    }
  };

  handleEditFormSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    let id = event.target.value;
    console.log(`Submitting edit for organisation ID: ${id}`);
    console.log(this.state.editOrganisation);

    fetch(SERVICE_URL + "organisation/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.editOrganisation),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.setState({ showEditModal: false });
        this.loadLocationsAndOrganisations();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  render() {
    return (
      <Container fluid style={{ padding: 0 }}>
        {/* <Container fluid> */}
        <Header />
        <Row>
          <Col sm={2} style={{ backgroundColor: "AliceBlue" }}>
            <Sidebar />
          </Col>

          <Col sm={9} style={{ padding: 50 }}>
            <Row>
              <AddOrganisationForm
                handleSubmitForm={this.handleSubmitForm}
                allLocations={this.state.allLocations}
                loadAll={this.loadLocationsAndOrganisations}
                locations={this.state.locations}
              />
            </Row>
            <Row>
              <TableOrganisation
                organisations={this.state.organisations}
                handleDelete={this.handleDeleteOrganisation}
                handleEdit={this.handleEditModalOpen}
              />
            </Row>
          </Col>
        </Row>
        <EditModalOrganisation
          organisation={this.state.editOrganisation}
          showModal={this.state.showEditModal}
          allLocations={this.state.allLocations}
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

export default Organisation;
