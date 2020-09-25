import React, { Component } from "react";
import { Formik } from "formik";
import { Button, Container, Col, Row, Alert, Form } from "react-bootstrap";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";

class AddSuperpowerForm extends Component {
  render() {
    let { submission, validationForm, clearFrom, submitForm } = this.props;
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
                    <h2>Add a Superpower</h2>
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
                      rows={3}
                    />

                    <Alert show={!errors.description == ""} variant={"danger"}>
                      {errors.description &&
                        touched.description &&
                        errors.description}
                    </Alert>
                  </Col>
                </Row>
                <Row className="justify-content">
                  <Button
                    type="reset"
                    onClick={handleReset}
                    title={"Clear"}
                    className="mr-4 ml-4 mt-2 mb-4"
                  >
                    Clear Form
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    title={"Submit"}
                    onClick={handleSubmit}
                    className="mr-4 ml-4 mt-2 mb-4"
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
export default AddSuperpowerForm;
