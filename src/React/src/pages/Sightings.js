import React from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

import AddSightingForm from "../components/AddSightingForm";
import TableSighting from "../components/TableSighting";
import EditModalSighting from "../components/EditModalSighting";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

const SERVICE_URL = "http://localhost:8090/";

class Sightings extends React.Component {
  state = {
    loading: false,
    showEditModal: false,
    updatedSightingId: "",
    sightings: [
      {
        id: 9,
        hero: {
          id: 45,
          name: "The sun",
          description: "I don't know",
          inOrganisation: [],
          villain: false,
          superPower: {
            id: 12,
            name: "Telekenesiss",
            description: "Move objects with your mind",
          },
        },
        location: {
          id: 12,
          name: "London",
          description: "A gloomy city.",
          address: null,
          latitude: 0.222,
          longitude: 32.32,
        },
        date: "2020-09-17",
      },
    ],

    editSighting: {
      id: 9,
      hero: {
        id: 45,
        name: "The sun",
        description: "I don't know",
        inOrganisation: [],
        villain: false,
        superPower: {
          id: 12,
          name: "Telekenesiss",
          description: "Move objects with your mind",
        },
      },
      location: {
        id: 12,
        name: "London",
        description: "A gloomy city.",
        address: null,
        latitude: 0.222,
        longitude: 32.32,
      },
      date: "2020-09-17",
    },

    characters: [
      {
        id: "",
        name: "Bob",
        description: "A great super hero",
        superPower: {
          id: 2,
          name: "flying",
          description: "You can fly like a bird",
        },
        villain: "",
        inOrganisation: ["Organisation 1", "Organisation 2"],
      },
    ],

    locations: [
      {
        id: "",
        name: "London",
        description: "Unpredictable weather",
        address: "UK",
        latitude: 0.22,
        longitude: 32.32,
      },
    ],

    allLocations: [],
    allCharacters: [],
  };

  componentDidMount() {
    console.log("App is now mounted");
    this.loadSightings();
    this.loadCharacters();
    this.loadLocations();
  }

  loadSightings() {
    this.setState({ loading: true });
    console.log("Loading sightings");
    fetch(SERVICE_URL + "/sighting")
      .then((data) => data.json())
      .then((data) => this.setState({ sightings: data, loading: false }));
  }

  loadCharacters() {
    this.setState({ loading: true });
    console.log("Loading characters");
    fetch(SERVICE_URL + "/hero")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          characters: data,
          loading: false,
          allCharacters: data.map((d) => d.name),
        })
      );
  }

  loadLocations() {
    this.setState({ loading: true });
    console.log("Loading locations");
    fetch(SERVICE_URL + "/location")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          locations: data,
          loading: false,
          allLocations: data.map((d) => d.name),
        })
      );
  }

  handleDeleteSighting = (event) => {
    if (event) {
      event.preventDefault();
    }
    let sightingId = event.target.value;
    console.log(`Submitting delete for sighting id ${sightingId}`);
    fetch(SERVICE_URL + "sightings", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: sightingId }),
    })
      .then((data) => {
        this.loadSightings();
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
    console.log(`Editing sighting ID: ${id}`);

    fetch(SERVICE_URL + "sighting/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.setState({ editSighting: data, showEditModal: true });
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
    let sightingInfo = this.state.editSighting;

    console.log(`Something changed in ${inputName} : ${inputValue}`);

    if (sightingInfo.hasOwnProperty(inputName)) {
      sightingInfo[inputName] = inputValue;
      this.setState({ editSighting: sightingInfo });
    }
  };

  handleEditFormSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    let id = event.target.value;
    console.log(`Submitting edit for sighting ID: ${id}`);
    console.log(this.state.editSighting);

    fetch(SERVICE_URL + "sighting/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.editSighting),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.setState({ showEditModal: false });
        this.loadSightings();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  handleForm = (event) => {
    event.preventDefault();
  }

  handleSubmitForm = (values, event) => {
    if (event) {
      event.preventDefault();
    }
    console.log("submit starting");
    let subhero = values.hero;
    let heroId;
    this.state.characters.forEach(c => {
      if (c.name == subhero) {
        heroId = c.id;
      }
    });
    let sublocation = values.location;
    let locationId;
    this.state.locations.forEach(l => {
      if (l.name == sublocation) {
        locationId = l.id;
      };
    });
    let subMission = {
      "hero": {
        "id": heroId,
      },
      "location": {
        "id": locationId,
      },
      "date": values.date
    };
    console.log(subMission);
    fetch(SERVICE_URL + '/sighting', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subMission),
    })
      .then((response) => response.json())
      .then(data => {
        this.loadSightings();
      })
      .catch(error => {
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
              <AddSightingForm
                allLocations={this.state.allLocations}
                allCharacters={this.state.allCharacters}
                submitForm={this.handleSubmitForm}
              />
            </Row>
            <Row>
              <TableSighting
                sightings={this.state.sightings}
                handleDelete={this.handleDeleteSighting}
                handleEdit={this.handleEditModalOpen}
              />
            </Row>
          </Col>
        </Row>
        <EditModalSighting
          sighting={this.state.editSighting}
          showModal={this.state.showEditModal}
          allLocations={this.state.allLocations}
          allCharacters={this.state.allCharacters}
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

export default Sightings;
