import React, { Component } from "react";
import { Form, Button, Modal } from "react-bootstrap";

class SuperpowerEditModal extends Component {
    render() {
        const { superpower, handleClose, closeButton, handleChange, handleSubmit } = this.props;
        return (
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title># {superpower.superpowerId}</Modal.Title>
                    </Modal.Header>
                </Modal.Dialog>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="superpowerName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Superpower Name"
                                name="superpowerName"
                                value={superpower.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="superpowerName">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                type="textarea"
                                rows="2"
                                placeholder="Superpower Description"
                                name="superpowerDescription"
                                value={superpower.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                value={superpower.superpowerId}
                                onClick={handleSubmit}
                            >
                                Save changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        )
    }
}
export default SuperpowerEditModal;