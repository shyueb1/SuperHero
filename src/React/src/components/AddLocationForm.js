import React, { Component } from "react";
import { Formik } from "formik";
import { Button, Container, Col, Row, Alert } from "react-bootstrap";
import Input from "../components/Input";
import TextArea from "../components/TextArea";

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
                        value={values.name}
                        onChange={handleChange}
                        type={"text"}
                        title={"Address"}
                        placeholder={"Enter address..."}
                        cols={50}
                        rows={3}
                      />
                    </Row>
                    <Row>
                      <Input
                        name={"latitude"}
                        value={values.name}
                        onChange={handleChange}
                        type={"number"}
                        title={"Latitude"}
                        placeholder={"Enter latitude..."}
                      />
                      <Input
                        name={"longitude"}
                        value={values.name}
                        onChange={handleChange}
                        type={"number"}
                        title={"Longitude"}
                        placeholder={"Enter longitude..."}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row className="justify-content">
                  <Button
                    type="reset"
                    action={handleReset}
                    title={"Clear"}
                    className="mr-2 ml-2 mb-4"
                  >
                    Clear Form
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    title={"Submit"}
                    className="mr-2 ml-2 mb-4"
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
