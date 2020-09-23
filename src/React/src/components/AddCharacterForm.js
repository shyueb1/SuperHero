import React, { Component } from "react";
import { Formik } from "formik";
import { Button, Container, Col, Row, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";

class AddCharacterForm extends Component {
    state = {
        submission: {
            "name": "",
            "description": "",
            "villain": false,
            "superpower": "",
            "inOrganisation": []
        },
        allVillain: [true, false],
        allSuperpowers: [],
        allOrganisations: []
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
                "villain": false,
                "superpower": "",
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
        let { submission, allVillain, allSuperpowers, allOrganisations } = this.state;
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
                                        placeholder={"Enter name..."} />
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

                                        </Col>
                                        <Col>
                                            <Select
                                                name={"superpower"}
                                                value={values.superpower}
                                                onChange={handleChange}
                                                title={"Superpower:"}
                                                placeholder={"Select superpower..."}
                                                options={allSuperpowers}
                                            />
                                            <Alert show={!errors.superpower == ""} variant={"danger"}>
                                                {errors.superpower && touched.superpower && errors.superpower}
                                            </Alert>

                                        </Col>
                                    </Row>
                                    <br />
                                    <Row className="justify-content-md-center">
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

export default AddCharacterForm;