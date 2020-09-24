import React, { Component } from "react";
import { Formik } from "formik";
import { Button, Container, Col, Row, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";

class AddOrganisationForm extends Component {
    state = {
        submission: {
            "name": "",
            "description": "",
            "location": {
                "id": 1,
                "name": "nyc",
                "description": "nyc the big apple",
                "address": "NYC, NY, USA",
                "latitude": 2.0,
                "longitute": 1.0
            },
            "telephone": ""
        },
        allLocations: []
    };

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
        if (!values.telephone.length > 0) {
            errors.telephone = "Telephone is required";
        }
        return errors;
    }

    render() {
        let { submission, allLocations } = this.state;
        return (
            <Container fluid>
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
                                <Col sm={6}>
                                    <Input name={"name"}
                                        value={values.name}
                                        onChange={handleChange}
                                        type={"text"}
                                        title={"Name"}
                                        placeholder={"Enter name..."}
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
                                        cols={30}
                                        rows={4}
                                    />
                                    <Alert show={!errors.description == ""} variant={"danger"}>
                                        {errors.description &&
                                            touched.description &&
                                            errors.description}
                                    </Alert>
                                </Col>
                                <Col sm={6}>
                                    <Row>
                                        <Col>
                                            <Select
                                                name={"location"}
                                                value={values.location}
                                                onChange={handleChange}
                                                title={"Location:"}
                                                placeholder={"Select a location..."}
                                                options={allLocations}
                                            />
                                            <Alert show={!errors.location == ""} variant={"danger"}>
                                                {errors.location && touched.location && errors.location}
                                            </Alert>

                                        </Col>
                                        <Col>
                                            <Input name={"telephone"}
                                                value={values.telephone}
                                                onChange={handleChange}
                                                type={"text"}
                                                title={"Telephone"}
                                                placeholder={"Enter telephone..."} />
                                            <Alert show={!errors.telephone == ""} variant={"danger"}>
                                                {errors.telephone && touched.telephone && errors.telephone}
                                            </Alert>

                                        </Col>
                                    </Row>
                                    <br />
                                    <Row className="justify-content-md-center">
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
                                </Col>
                            </Row>
                        </form>
                    );
                }}
                </Formik>
            </Container>
        );
    }
}

export default AddOrganisationForm;
