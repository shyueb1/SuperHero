import React, { Component } from "react";
import { Formik } from "formik";
import { Button, Container, Col, Row, Alert } from "react-bootstrap";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { TiLocation } from "react-icons/ti";

class AddLocationForm extends Component {
  render() {
    const { submission, validationForm, clearFrom, submitForm } = this.props;
    return (
      <Container fluid>
        <Formik
          enableReinitialize={true}
          initialValues={submission}
          validation={validationForm}
          onReset={clearFrom}
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
              <form onSubmit={handleSubmit}>
                <Row>
                  <h2 className="mr-4 ml-2 mb-4">Add a Location</h2>
                </Row>
                <Row>
                  <Col sm={6}>
                    <Input
                      name={"name"}
                      value={values.name}
                      onChange={handleChange}
                      type={"text"}
                      title={"Name: "}
                      icon={<TiLocation />}
                      placeholder={"Enter name..."}
                    />
                    <Alert show={!errors.name == ""} variant={"danger"}>
                      {errors.name && touched.name && errors.name}
                    </Alert>
                    <TextArea
                      name={"description"}
                      value={values.description}
                      onChange={handleChange}
                      title={"Description:"}
                      placeholder={"Enter description..."}
                      cols={50}
                      rows={3}
                    />
                    <Alert show={!errors.description == ""} variant={"danger"}>
                      {errors.description &&
                        touched.description &&
                        errors.description}
                    </Alert>
                  </Col>
                  <Col sm={6}>
                    <Row>
                      <TextArea
                        name={"address"}
                        value={values.address}
                        onChange={handleChange}
                        type={"text"}
                        title={"Address:"}
                        placeholder={"Enter address..."}
                        cols={50}
                        rows={3}
                        textmuted={"E.g. 28 Wall Street, New York, USA"}
                      />
                    </Row>
                    <Row>
                      <Input
                        name={"latitude"}
                        value={values.latitude}
                        onChange={handleChange}
                        type={"number"}
                        title={"Latitude:"}
                        placeholder={"Enter latitude..."}
                        textmuted={"Range: -90 to 90"}
                      />
                &nbsp;&nbsp;
                      <Input
                        name={"longitude"}
                        value={values.longitude}
                        onChange={handleChange}
                        type={"number"}
                        title={"Longitude:"}
                        placeholder={"Enter longitude..."}
                        textmuted={"Range: -180 to 180"}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row className="justify-content">
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

export default AddLocationForm;
