import React, { Component } from "react";
import { Formik } from "formik";
import { Button, Container, Col, Row, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";

const SERVICE_URL = "http://localhost:8090/";

class AddOrganisationForm extends Component {
    state = {
        submission: {
            "name": "",
            "description": "",
            "location": "",
            "telephone": ""
        },
        addOrganisation: {
            "id": "",
            "name": "",
            "description": "",
            "location": "",
            "telephone": ""
        },
        locations: [
            {
                "id": "",
                "name": "",
                "description": "",
                "address": "",
                "latitude": "",
                "longitude": ""
            }
        ],
        allLocations: []
    };

    componentDidMount() {
        console.log("App is now mounted");
        this.loadLocations();
        this.loadAllLocations();
    }

    loadLocations() {
        this.setState({ loading: true });
        console.log("Loading locations");
        fetch(SERVICE_URL + "/location")
            .then((response) => response.json())
            .then((data) => this.setState({ locations: data, loading: false }));
    }

    loadAllLocations() {
        let allLocs = [];
        this.state.locations.forEach(l => {
            allLocs.push(l.name);
        });
        this.setState({ allLocations: allLocs });
        console.log(allLocs);
        console.log("Successful load")
    }

    handleSubmitForm = () => {

        fetch(SERVICE_URL + "/organisation/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.submission),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                this.props.loadOrganisations();
            })
            .catch((error) => {
                console.log("Error:", error);
            });

    }

    handleClearForm = (values) => {
        this.setState({
            submission: {
                "name": "",
                "description": "",
                "location": "",
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

    handleLocationChange = (event) => {
        if (event) {
            event.preventDefault();
        }
        let locationName = event.target.value;
        let locationId;
        this.state.locations.forEach(l => {
            if (l.name === locationName) {
                locationId = l.id;
            }
        });
        let newObject = this.state.submission;
        newObject.location = locationId;
        this.setState({ submission: newObject });
    }
    //  this.setState(prevState => {
    //     return {
    //    submission.location.id: prevState.submission.location.locationId
    //     }
    // }
    // )

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
                                    <h2>Add an Organisation</h2>
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
                                                onChange={this.handleLocationChange}
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
                                            onClick={handleReset}
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
