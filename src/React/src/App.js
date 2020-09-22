import React from 'react';
import './App.css';
import { Container, Row, Col, Jumbotron, Modal, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-feather';
import NewsFeed from './components/NewsFeed';

//const SERVICE_URL = "";

class App extends React.Component {
  state = {
    sightings: [],

  }

  render() {
    return (
      <Container fluid style={{ padding: 0 }}>
        <Row>
          <Col>
            <Jumbotron fluid >
              <h1 className="text-center" style={{ fontSize: 100 }}>Superhero and Supervillain Sightings</h1>
              <p className="text-center">A brief intro to this web app</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
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
          <Col sm={10}>
            <NewsFeed />
          </Col>
        </Row>
        <Modal.Footer>
          <Row>
            <Col sm={2} className="text-center">
              {/* <Link href="#aboutus">About Us</Link> */}
            </Col>
            <Col sm={2} className="text-center">
              {/* <Link href="#faqs">FAQs</Link> */}
            </Col>
            <Col sm={8}>
              <Icon.Facebook />
              <Icon.Instagram />
              <Icon.Twitter />
            </Col>
          </Row>
        </Modal.Footer>

      </Container>
    );
  }

}

export default App;
