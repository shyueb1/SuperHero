import React, { Component } from "react";
import { Formik } from "formik";
import { Button, Container, Col, Row, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "../components/Input";
import Select from "../components/Select";


class AddSightingForm extends Component {
    state = {
        submission: {
            "hero": "",
            "location": "",
            "date": ""
        },
        allHeros: [],
        allLocations: [],
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
                "hero": "",
                "location": "",
                "date": ""
            }
        });
        console.log("Submission form cleared");
    }

    handleValidateForm = (values) => {
        let errors = {};

        if (!values.date.length > 0) {
            errors.date = "Date is required";
        }
        return errors;
    }

    render() {
        let { submission, allHeros, allLocations } = this.state;
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
                                <Col>
                                    <Row>
                                        <Col>
                                            <Select
                                                name={"hero"}
                                                value={values.hero}
                                                onChange={handleChange}
                                                title={"Hero or Villain:"}
                                                placeholder={"Select a hero or villain..."}
                                                options={allHeros}
                                            />
                                            <Alert show={!errors.hero == ""} variant={"danger"}>
                                                {errors.hero && touched.hero && errors.hero}
                                            </Alert>

                                        </Col>
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
                                    </Row>
                                    <br />
                                    <Row className="justify-content-md-center">
                                        <Input name={"date"}
                                            value={values.date}
                                            onChange={handleChange}
                                            type={"text"}
                                            title={"Date"}
                                            placeholder={"Enter date..."} />
                                        <Alert show={!errors.date == ""} variant={"danger"}>
                                            {errors.date && touched.date && errors.date}
                                        </Alert>
                                        <br />
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

export default AddSightingForm;
