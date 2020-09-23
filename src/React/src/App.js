import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./Main";

function App() {
  return (
    <Container fluid style={{ padding: 0, marginRight: 0, marginLeft: 0 }}>
      <Main />
    </Container>
  );
}

export default App;