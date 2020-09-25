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
    loading: false,
    submission: {
      name: "",
      description: "",
      location: "",
      telephone: "",
    },
    addOrganisation: {
      id: "",
      name: "",
      description: "",
      location: "",
      telephone: "",
    },
  };

  handleClearForm = (values) => {
    this.setState({
      submission: {
        name: "",
        description: "",
        location: "",
        telephone: "",
      },
    });
    console.log("Submission form cleared");
  };

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
  };

  handleLocationChange = (event) => {
    if (event) {
      event.preventDefault();
    }
    let locationName = event.target.value;
    let locationId;
    this.state.locations.forEach((l) => {
      if (l.name === locationName) {
        locationId = l.id;
      }
    });
    let newObject = this.state.submission;
    newObject.location = { id: locationId };
    this.setState({ submission: newObject });
  };

  render() {
    let { submission } = this.state;
    let { locations, allLocations, handleSubmitForm } = this.props;
    return (
      <Container fluid>
        <Formik
          enableReinitialize={true}
          initialValues={submission}
          validate={this.handleValidateForm}
          onReset={this.handleClearForm}
          onSubmit={handleSubmitForm}
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
              <form onSubmit={handleSubmit}>
                <Row>
                  <h2 className="mr-4 ml-2 mb-4">Add an Organisation</h2>
                </Row>
                <Row>
                  <Col sm={6}>
                    <Input
                      name={"name"}
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
                      cols={50}
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
                      <Select
                        name={"location"}
                        value={values.location}
                        onChange={this.handleLocationChange}
                        onChange={handleChange}
                        title={"Location:"}
                        placeholder={"Select a location..."}
                        options={allLocations}
                        textmuted={
                          "Navigate to the Locations page to add a new location"
                        }
                      />
                      <Alert show={!errors.location == ""} variant={"danger"}>
                        {errors.location && touched.location && errors.location}
                      </Alert>
                      <Input
                        name={"telephone"}
                        value={values.telephone}
                        onChange={handleChange}
                        type={"text"}
                        title={"Telephone"}
                        placeholder={"Enter telephone..."}
                      />
                      <Alert show={!errors.telephone == ""} variant={"danger"}>
                        {errors.telephone &&
                          touched.telephone &&
                          errors.telephone}
                      </Alert>
                      <br />
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Button
                    type="reset"
                    onClick={handleReset}
                    title={"Clear"}
                    className="mr-4 ml-4 mb-4"
                  >
                    Clear Form
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    title={"Submit"}
                    className="mr-4 ml-4 mb-4"
                    onClick={handleSubmit}
                  >
                    Submit Form
                  </Button>
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
