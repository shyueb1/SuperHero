import React, { Component } from "react";
import { Formik } from "formik";
import { Button, Container, Col, Row, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";

const SERVICE_URL = "http://localhost:8090/";

class AddCharacterForm extends Component {
    state = {
        loading: false,
        submission: {
            "name": "",
            "description": "",
            "villain": "",
            "superPower": "",
            "inOrganisation": []
        },
        allVillain: ["true", "false"],
        superpowers: [
            {
                "id": 1,
                "name": "Invisible",
                "description": "Can be invisible for an hour without break",
            }
        ],
        organisations: [
            {
                "name": "",
                "description": "",
                "location": {
                    "id": 1,
                    "name": "",
                    "description": "",
                    "address": "",
                    "latitude": 2.0,
                    "longitute": 1.0
                },
                "telephone": ""
            }
        ],
        allSuperpowers: [],
        allOrganisations: []
    };

    componentDidMount() {
        console.log("App is now mounted");
        this.loadSuperpowers();
        this.loadOrganisations();
    }

    loadAllSuperpowers() {
        let allPowers = [];
        this.state.superpowers.forEach(power => {
            allPowers.push(power);
        });
        this.setState({ allSuperpowers: allPowers });
        let allOrganisation = [];
        this.state.organisations.forEach(org => {
            allOrganisation.push(org);
        });
        this.setState({ allOrganisations: allOrganisation });
    }

    loadAllOrganisationsAndSuperpowers() {
        let allPowers = [];
        this.state.superpowers.forEach(power => {
            allPowers.push(power);
        });
        this.setState({ allSuperpowers: allPowers });
        let allOrganisation = [];
        this.state.organisations.forEach(org => {
            allOrganisation.push(org);
        });
        this.setState({ allOrganisations: allOrganisation });
    }

    loadSuperpowers() {
        this.setState({ loading: true });
        console.log("Loading superpowers");
        fetch(SERVICE_URL + "/superpower")
            .then((response) => response.json())
            .then((data) => this.setState({ superpowers: data, loading: false }));
    }

    loadOrganisations() {
        this.setState({ loading: true });
        console.log("Loading organisations");
        fetch(SERVICE_URL + "organisation")
            .then(data => data.json())
            .then(data => this.setState(
                { organisations: data, loading: false }
            ));
    }

    handleSubmitForm = (values, { setSubmitting }) => {
        const submission = values;
        alert(JSON.stringify(submission, null, 2));
        console.log("Submitted submission: " + JSON.stringify(submission));
        setSubmitting(false);
    }

    handleClearForm = (values) => {
        this.setState({
            submission: {
                "name": "",
                "description": "",
                "villain": "",
                "superPower": "",
                "inOrganisation": []
            }
        });
        console.log("Submission form cleared");
    }

    handleValidateForm = (values) => {
        let errors = {};

        if (!values.name.length > 0) {
            errors.name = "Name is required";
        }
        if (!values.description.length > 0) {
            errors.description = "Description is required";
        }
        return errors;
    }

    render() {
        let { submission, allVillain, superpowers, organisations, allSuperpowers, allOrganisations } = this.state;
        return (
            <Container fluid onLoad={this.loadAllOrganisationsAndSuperpowers}>
                <Formik
                    enableReinitialize={true}
                    initialValues={submission}
                    validate={this.handleValidateForm}
                    onReset={this.handleClearForm}
                    onSubmit={this.handleSubmitForm}
                >{formikProps => {
                    let {
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleReset,
                        handleSubmit,
                        isSubmitting
                    } = formikProps;
                    return (
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={7}>
                                    <Input name={"name"}
                                        value={values.name}
                                        onChange={handleChange}
                                        type={"text"}
                                        title={"Name"}
                                        placeholder={"Enter name..."}
                                    //border={touched.name && errors.name ? "error" : null}
                                    />

                                    <Alert show={!errors.name == ""} variant={"danger"}>
                                        {errors.name && touched.name && errors.name}
                                    </Alert>
                                    <br />
                                    <TextArea
                                        name={"description"}
                                        value={values.description}
                                        onChange={handleChange}
                                        title={"Description:"}
                                        cols={50}
                                        rows={3}
                                    />
                                    <Alert show={!errors.description == ""} variant={"danger"}>
                                        {errors.description &&
                                            touched.description &&
                                            errors.description}
                                    </Alert>
                                </Col>
                                <Col sm={5}>
                                    <Select
                                        name={"villain"}
                                        value={values.villain}
                                        onChange={handleChange}
                                        title={"Is a Villain:"}
                                        placeholder={"Select true or false..."}
                                        options={allVillain}
                                    />
                                    <Alert show={!errors.villain == ""} variant={"danger"}>
                                        {errors.villain && touched.villain && errors.villain}
                                    </Alert>

                                    <Select
                                        name={"superpower"}
                                        value={values.superPower}
                                        onChange={handleChange}
                                        title={"Superpower:"}
                                        placeholder={"Select superpower..."}
                                        options={allSuperpowers}
                                    />
                                    <Alert show={!errors.superPower == ""} variant={"danger"}>
                                        {errors.superPower && touched.superPower && errors.superPower}
                                    </Alert>
                                    <Select
                                        name={"inOrganisation"}
                                        value={values.inOrganisation}
                                        onChange={handleChange}
                                        title={"Organisations:"}
                                        placeholder={"Select organisations..."}
                                        options={allOrganisations}
                                        multiple
                                    />
                                    <Alert show={!errors.inOrganisation == ""} variant={"danger"}>
                                        {errors.inOrganisation && touched.inOrganisation && errors.inOrganisation}
                                    </Alert>
                                    <br />
                                </Col>
                            </Row>
                            <Row>
                                <Button
                                    type="reset"
                                    action={handleReset}
                                    title={"Clear"}
                                    className="mr-4 ml-4 mt-2 mb-4"
                                >Clear Form</Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    title={"Submit"}
                                    className="mr-4 ml-4 mt-2 mb-4"
                                >Submit Form</Button>
                            </Row>
                        </form>
                    );
                }}
                </Formik>
            </Container>
        );
    }
}

export default AddCharacterForm;
