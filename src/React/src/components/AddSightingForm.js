import React, { Component } from "react";
import { Formik } from "formik";
import { Button, Container, Col, Row, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import Select from "../components/Select";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class AddSightingForm extends Component {
  state = {
    submission: {
      hero: "",
      location: "",
      date: new Date(),
    },
    allHeros: [],
    allLocations: [],
  };

  handleDateChange = (date) => {
    this.setState({
      date: date,
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
    let { allCharacters, allLocations, submitForm } = this.props;
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
              <form addEventListener={('submit', this.props.handleForm)} onSubmit={(e) => handleSubmit(this.state.submission, e)}>
                <Row>
                  <h2 className="mr-4 ml-2 mb-4">Add a Sighting</h2>
                </Row>
                <Row>
                  <Col>
                    <Select
                      name={"hero"}
                      value={values.hero}
                      onChange={handleChange}
                      title={"Hero or Villain:"}
                      placeholder={"Select a hero or villain..."}
                      options={allCharacters}
                    />
                    <Alert show={!errors.hero == ""} variant={"danger"}>
                      {errors.hero && touched.hero && errors.hero}
                    </Alert>
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
}

export default AddSightingForm;
