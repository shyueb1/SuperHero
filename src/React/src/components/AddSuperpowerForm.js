import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";

class SuperpowerForm extends Component {
    render() {

        return (
            <Col>
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
                            as="textarea"
                            rows="2"
                            placeholder="Superpower description"
                        ></Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
        </Button>
                </Form>
            </Col>
        );
    }
}

export default SuperpowerForm;
