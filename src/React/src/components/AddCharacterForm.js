import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

class AddCharacterForm extends Component {
    render() {

        return (
            <Form>
                <Form.Group controlId="formCharacterName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Character name"
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="formCharacterDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="textarea"
                        rows="2"
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="formHeroOrVillain">
                    <Form.Label>Hero or Villain</Form.Label>
                    <Form.Control as="select">
                        <option>Choose type</option>
                        <option>Hero</option>
                        <option>Villain</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formSuperpower">
                    <Form.Label>Superpower</Form.Label>
                    <Form.Control as="select">
                        <option>Choose a superpower</option>
                        <option>Super Strength</option>
                        <option>Flying</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formOrganisations">
                    <Form.Label>Organisations</Form.Label>
                    <Form.Control as="select" multiple>
                        <option>Organisation 1</option>
                        <option>Organisation 2</option>
                        <option>Organisation 3</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
        </Button>
            </Form>
        );
    }
}

export default AddCharacterForm;
