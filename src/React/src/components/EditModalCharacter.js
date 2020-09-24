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

                        <Form.Group controlId="characterName">
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

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
              </Button>
                            <Button
                                variant="primary"
                                value={character.id}
                                onClick={handleSubmit}
                            >
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
