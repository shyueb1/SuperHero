import React, { Component } from "react";

import { Form, Button, Modal } from "react-bootstrap";

class EditModalOrganisation extends Component {
  render() {
    let {
      organisation,
      showModal,
      handleClose,
      handleChange,
      handleSubmit,
      allLocations,
    } = this.props;
    return (
      <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title># {organisation.id}</Modal.Title>
          </Modal.Header>
        </Modal.Dialog>

        <Modal.Body>
          <Form>
            <Form.Group controlId="organisationName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name.."
                name="name"
                value={organisation.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="textarea"
                rows="2"
                placeholder="Organisation description.."
                name="description"
                value={organisation.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                as="select"
                name="location"
                defaultValue="Select location..."
                value={organisation.location}
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

            <Form.Group controlId="telephone">
              <Form.Label>Telephone:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter telephone.."
                name="telephone"
                value={organisation.telephone}
                onChange={handleChange}
              />
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
export default EditModalOrganisation;
