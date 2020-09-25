import React, { Component } from "react";

import { Form, Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from "moment";

class EditModalSighting extends Component {
  render() {
    let {
      sighting,
      showModal,
      handleClose,
      handleChange,
      handleSubmit,
      allLocations,
      allCharacters,
    } = this.props;
    return (
      <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title># {sighting.id}</Modal.Title>
          </Modal.Header>
        </Modal.Dialog>

        <Modal.Body>
          <Form>
            <Form.Group controlId="heroName">
              <Form.Label>Hero:</Form.Label>
              <Form.Control
                as="select"
                name="hero"
                defaultValue="Select hero..."
                value={sighting.hero}
                onChange={handleChange}
              >
                <option>Select hero...</option>
                {allCharacters.map((x) => (
                  <option>{x}</option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted">
                Navigate to the Superheroes/Supervillains page to add a new
                character
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                as="select"
                name="location"
                defaultValue="Select location..."
                value={sighting.location}
                onChange={handleChange}
              >
                <option>Select location...</option>
                {allLocations.map((x) => (
                  <option>{x}</option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted">
                Navigate to the Locations page to add a new location
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="date">
              <Form.Label>Date:</Form.Label>
              {/* <Form.control
                type="date"
                name="dob"
                onChange={handleChange}
                dateFormat={"yyyy/MM/dd"}
              /> */}
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Save changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
export default EditModalSighting;
