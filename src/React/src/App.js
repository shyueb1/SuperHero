import React from "react";
import "./App.css";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Modal,
  Nav,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "react-feather";
import NewsFeed from "./components/NewsFeed.js";

//const SERVICE_URL = "";

class App extends React.Component {
  state = {
    sightings: [
      {
        id: 1,
        hero: "Superman",
        location: "29 Wall Street",
        date: "2020-02-02",
      },
      {
        id: 1,
        hero: "Superman",
        location: "29 Wall Street",
        date: "2020-02-02",
      },
      {
        id: 1,
        hero: "Superman",
        location: "29 Wall Street",
        date: "2020-02-02",
      },
      {
        id: 1,
        hero: "Superman",
        location: "29 Wall Street",
        date: "2020-02-02",
      },
    ],
  };

  render() {
    return (
      <Container fluid style={{ padding: 0 }}>
        {/* <Container fluid> */}
        <Row>
          <Col>
            <Jumbotron fluid style={{ padding: 0 }}>
              <h1 className="text-center" style={{ fontSize: 100 }}>
                Superhero and Supervillain Sightings
              </h1>
              <p className="text-center">A brief intro to this web app</p>
            </Jumbotron>
          </Col>
        </Row>

        <Row>
          <Col sm={3}>
            <br />
            <Nav defaultActiveKey="#home" className="flex-column">
              <Nav.Item>
                <Nav.Link href="#home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#super">Superheroes and Supervillains</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#power">Superpowers</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#location">Locations</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#Organisation">Organisations</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#Sighting">Sightings</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col sm={9}>
            <h3 className="text-center">Latest Sightings</h3>
            <NewsFeed sightings={this.state.sightings} />
          </Col>
        </Row>

        <Modal.Footer>
          <Nav fill>
            <Nav.Item>
              <Nav.Link href="#aboutus">About Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#faqs">FAQs</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Icon.Facebook />
            </Nav.Item>
            <Nav.Item>
              <Icon.Instagram />
            </Nav.Item>
            <Nav.Item>
              <Icon.Twitter />
            </Nav.Item>
          </Nav>
        </Modal.Footer>
      </Container>
    );
  }
}

export default App;
