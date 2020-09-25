import React, { Component } from "react";

import { Form, Button, Modal } from "react-bootstrap";

class EditModalCharacter extends Component {
  render() {
    let {
      character,
      showModal,
      handleClose,
      handleChange,
      handleSubmit,
      allSuperpowers,
      allOrganisations,
      allVillain,
    } = this.props;
    return (
      <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title># {character.id}</Modal.Title>
          </Modal.Header>
        </Modal.Dialog>

        <Modal.Body>
          <Form>
            <Form.Group controlId="characterName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name.."
                name="name"
                value={character.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="textarea"
                rows="2"
                placeholder="Character description.."
                name="description"
                value={character.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="villain">
              <Form.Label>Is a villain:</Form.Label>
              <Form.Control
                as="select"
                name="villain"
                defaultValue="Select true or false..."
                value={character.villain}
                onChange={handleChange}
              >
                <option>Select true or false...</option>
                {allVillain.map((x) => (
                  <option>{x}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="superpower">
              <Form.Label>Superpower:</Form.Label>
              <Form.Control
                as="select"
                name="superPower"
                defaultValue="Select superpower..."
                value={character.superPower}
                onChange={handleChange}
              >
                <option>Select superpower...</option>
                {allSuperpowers.map((x) => (
                  <option>{x}</option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted">
                Navigate to the Superpowers page to add a new superpower
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="organisation">
              <Form.Label>Organisation:</Form.Label>
              <Form.Control
                as="select"
                name="inOrganisation"
                defaultValue="Select organisations..."
                value={character.inOrganisation}
                onChange={handleChange}
              >
                <option>Select organisations...</option>
                {allOrganisations.map((x) => (
                  <option>{x}</option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted">
                Navigate to the Organisations page to add a new organisation
              </Form.Text>
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
export default EditModalCharacter;
