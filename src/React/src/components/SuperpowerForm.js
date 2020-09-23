import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

class SuperpowerForm extends Component {
    render() {

        return (
            <Form>
                <Form.Group controlId="formSuperpowerName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Superpower name"
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="formSuperpowerDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="textarea"
                        rows="2"
                        placeholder="Superpower description"
                    ></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
        </Button>
            </Form>
        );
    }
}

export default SuperpowerForm;
