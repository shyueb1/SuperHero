import React, { Component } from "react";
import { Formik } from "formik";
import { Button, Container, Col, Row, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import Select from "../components/Select";
import DatePicker from "react-datepicker";
import { BsPersonFill, BsFillLightningFill } from "react-icons/bs";
import { TiLocation } from "react-icons/ti";

import "react-datepicker/dist/react-datepicker.css";

const SERVICE_URL = "http://localhost:8090/";

class AddSightingForm extends Component {
    state = {
        submission: {
            hero: "",
            location: "",
            date: new Date(),
        },
        allHeros: [],
        allLocations: []
    };

    handleDateChange = (date) => {
        this.setState({
            date: date
        });
    };

    handleClearForm = (values) => {
        this.setState({
            submission: {
                hero: "",
                location: "",
                date: "",
            },
        });
        console.log("Submission form cleared");
    };

    handleValidateForm = (values) => {
        let errors = {};

        if (!values.date.length > 0) {
            errors.date = "Date is required";
        }
        return errors;
    };

    render() {
        let { submission } = this.state;
        let { allCharacters, allLocations, submitForm, loadSightings, heroes, locations } = this.props;
        return (
            <Container fluid>
                <Formik
                    enableReinitialize={true}
                    initialValues={submission}
                    validate={this.handleValidateForm}
                    onReset={this.handleClearForm}
                    onSubmit={submitForm}
                >
                    {(formikProps) => {
                        let {
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleReset,
                            handleSubmit,
                            isSubmitting,
                        } = formikProps;
                        return (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                console.log(values);
                                console.log(heroes);
                                let heroId;
                                let heroLocationId;
                                heroes.forEach(hero => {
                                    if (hero.name === values.hero) {
                                        heroId = hero.id;
                                        console.log("FOUND MATCH");
                                        console.log(heroId);
                                    }
                                });
                                locations.forEach(loc => {
                                    if (loc.name === values.location) {
                                        heroLocationId = loc.id;
                                        console.log("FOUND MATCH");
                                        console.log(loc.id);
                                    }
                                });
                                let sightingDate = new Date(this.state.date).toISOString();
                                fetch(SERVICE_URL + 'sighting', {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ "hero": { "id": heroId }, "location": { "id": heroLocationId }, "date": sightingDate })
                                })
                                    .then((response) => response.json())
                                    .then(data => {
                                        loadSightings();
                                    })
                                    .catch(error => {
                                        console.log("Error:", error);
                                    });

                            }}>
                                <Row>
                                    <h2 className="mr-4 ml-2 mb-4">Add a Sighting</h2>
                                </Row>
                                <Row>
                                    <Col>
                                        <Select
                                            id="sighting-hero"
                                            name={"hero"}
                                            value={values.hero}
                                            onChange={handleChange}
                                            title={"Hero or Villain:"}
                                            placeholder={"Select a hero or villain..."}
                                            options={allCharacters}
                                            icon={<BsPersonFill />}
                                            textmuted={
                                                "Navigate to the Superheroes and Supervillains page to add a new hero or villain"
                                            }
                                        />
                                        <Alert show={!errors.hero == ""} variant={"danger"}>
                                            {errors.hero && touched.hero && errors.hero}
                                        </Alert>
                                        <Select
                                            id="sighting-location"
                                            name={"location"}
                                            value={values.location}
                                            onChange={handleChange}
                                            title={"Location:"}
                                            placeholder={"Select a location..."}
                                            options={allLocations}
                                            icon={<TiLocation />}
                                            textmuted={
                                                "Navigate to the Locations page to add a new location"
                                            }

                                        />
                                        <Alert show={!errors.location == ""} variant={"danger"}>
                                            {errors.location && touched.location && errors.location}
                                        </Alert>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <label>Date: </label>
                                        </Row>
                                        <Row>
                                            <DatePicker
                                                selected={this.state.date}
                                                onChange={this.handleDateChange}
                                                dateFormat={"yyyy/MM/dd"}
                                                filterDate={(date) => {
                                                    return moment() > date;
                                                }}
                                                placeholderText={"Select a date..."}
                                            />
                                            <br />
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button
                                            type="reset"
                                            onClick={handleReset}
                                            title={"Clear"}
                                            className="mr-4 ml-2 mb-4"
                                        >
                                            Clear Form
                    </Button>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            title={"Submit"}
                                            onClick={submitForm}
                                            className="mr-4 ml-2 mb-4"
                                        >
                                            Submit Form
                    </Button>
                                    </Col>
                                </Row>
                            </form>
                        );
                    }}
                </Formik>
            </Container>
        );
    }
};
export default AddSightingForm;
