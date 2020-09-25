import React from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import AddCharacterForm from "../components/AddCharacterForm";
import TableCharacter from "../components/TableCharacter";
import EditModalCharacter from "../components/EditModalCharacter";

const SERVICE_URL = "http://localhost:8090/";

class Character extends React.Component {
  state = {
    loading: false,
    showEditModal: false,
    characters: [
      {
        id: 1,
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

    editCharacter: {
      id: 1,
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

    allVillain: ["true", "false"],

    superpowers: [
      {
        id: 1,
        name: "Invisible",
        description: "Can be invisible for an hour without break",
      },
    ],
    organisations: [
      {
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
    allSuperpowers: [],
    allOrganisations: [],
  };
  componentDidMount() {
    console.log("App is now mounted");
    this.loadCharacters();
    this.loadSuperpowers();
    this.loadOrganisations();
  }

  loadSuperpowers() {
    this.setState({ loading: true });
    console.log("Loading superpowers");
    fetch(SERVICE_URL + "/superpower")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          superpowers: data,
          loading: false,
          allSuperpowers: data.map((d) => d.name),
        })
      );
  }

  loadOrganisations() {
    this.setState({ loading: true });
    console.log("Loading organisations");
    fetch(SERVICE_URL + "organisation")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        this.setState({
          organisations: data,
          loading: false,
          allOrganisations: data.map((d) => d.name),
        });
      });
  }
  handleSubmitForm = (values) => {
    let subName = values.name;
    let subDescription = values.description;
    let subVillain = values.villain;
    let subSuperpower = values.superPower;
    let superpowerId;
    this.state.superpowers.forEach((s) => {
      if (s.name == subSuperpower) {
        superpowerId = s.id;
      }
    });
    let subOrg = values.inOrganisation;
    let orgId = [];
    let subMission = {
      name: subName,
      description: subDescription,
      superPower: {
        id: superpowerId,
      },
      villain: subVillain == "false" ? false : true,

      inOrganisation: orgId,
    };
    fetch(SERVICE_URL + "/hero/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subMission),
    })
      .then((response) => response.json())
      .then((data) => {
        let updatedPower;
        this.state.superpowers.forEach((power) => {
          if (power.name === subSuperpower) {
            updatedPower = power.name;
          }
        });

        subMission.superPower = {
          name: updatedPower,
        };
        subMission.id = data.id;
        subMission.villain = subMission.isVillain;
        this.setState({ characters: [...this.state.characters, subMission] });
        // this.loadCharacters();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  loadCharacters() {
    this.setState({ loading: true });
    console.log("Loading characters");
    fetch(SERVICE_URL + "hero")
      .then((data) => data.json())
      .then((data) => {
        this.setState({ characters: data, loading: false });
        console.log(data);
      });
  }

  handleDeleteCharacter = (event) => {
    if (event) {
      event.preventDefault();
    }
    let heroId = event.target.value;
    console.log(`Submitting delete for hero id ${heroId}`);
    fetch(SERVICE_URL + "hero", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: heroId }),
    })
      .then((data) => {
        this.loadCharacters();
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
    console.log(`Editing character ID: ${id}`);

    fetch(SERVICE_URL + "/hero/" + id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ editCharacter: data, showEditModal: true });
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
    let characterInfo = this.state.editCharacter;

    console.log(`Something changed in ${inputName} : ${inputValue}`);

    console.log((characterInfo.inputName = inputValue));

    characterInfo.inputName = inputValue;
    let superpowerID;
    this.state.superpowers.forEach((s) => {
      if (s.name == characterInfo.inputName) {
        superpowerID = s.id;
      }
    });
    characterInfo.superPower.id = superpowerID;
    this.setState({ editCharacter: characterInfo });
  };

  handleEditFormSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    let id = this.state.editCharacter.id;
    console.log(`Submitting edit for character ID: ${id}`);
    console.log(this.state.editCharacter);
    let subMission = {
      id: this.state.editCharacter.id,
      name: this.state.editCharacter.name,
      description: this.state.editCharacter.description,
      superPower: {
        id: this.state.editCharacter.superPower.id,
      },

      inOrganisation: null,
      isVillain: this.state.editCharacter.villain == "false" ? false : true,
    };
    let superpowerSubmission = {
      id: this.state.editCharacter.id,
      superPower: { id: this.state.editCharacter.superPower.id },
    };
    console.log(JSON.stringify(subMission));
    console.log(JSON.stringify(superpowerSubmission));
    Promise.all([
      fetch(SERVICE_URL + "hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subMission),
      }),
      fetch(SERVICE_URL + "hero/superpower", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(superpowerSubmission),
      }),
    ])
      .then(([response1, response2]) => {
        return Promise.all([response1.json(), response2.json()]);
      })
      .then(([data1, data2]) => {
        console.log("Success:", data1, data2);
        this.setState({ showEditModal: false });
        this.loadCharacters();
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
              <AddCharacterForm
                handleSubmitForm={this.handleSubmitForm}
                allSuperpowers={this.state.allSuperpowers}
                superpowers={this.state.superpowers}
                allOrganisations={this.state.allOrganisations}
                organisations={this.state.organisations}
                allVillain={this.state.allVillain}
              />
            </Row>
            <hr />
            <Row>
              <TableCharacter
                characters={this.state.characters}
                handleDelete={this.handleDeleteCharacter}
                handleEdit={this.handleEditModalOpen}
              />
            </Row>
          </Col>
        </Row>

        <EditModalCharacter
          character={this.state.editCharacter}
          showModal={this.state.showEditModal}
          allSuperpowers={this.state.allSuperpowers}
          allOrganisations={this.state.allOrganisations}
          allVillain={this.state.allVillain}
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

export default Character;
