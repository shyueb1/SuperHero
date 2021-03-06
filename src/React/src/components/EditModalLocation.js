import React, { Component } from "react";
import { Form, Button, Modal } from "react-bootstrap";

class EditModalLocation extends Component {
  render() {
    let {
      location,
      showModal,
      handleClose,
      handleChange,
      handleSubmit,
    } = this.props;
    return (
      <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title># {location.id}</Modal.Title>
          </Modal.Header>
        </Modal.Dialog>

        <Modal.Body>
          <Form>
            <Form.Group controlId="locationName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name..."
                name="name"
                value={location.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="locationDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="textarea"
                rows="2"
                placeholder="Describe location..."
                name="description"
                value={location.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="locationAddress">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="textarea"
                rows="2"
                placeholder="Enter address..."
                name="address"
                value={location.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="locationLatitude">
              <Form.Label>Latitude:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter latitude... "
                name="latitude"
                value={location.latitude}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="locationLongitude">
              <Form.Label>Longitude:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter longitude... "
                name="longitude"
                value={location.longitude}
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
export default EditModalLocation;
