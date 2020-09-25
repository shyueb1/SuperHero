import React from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

import NewsFeed from "../components/NewsFeed";

const SERVICE_URL = "http://localhost:8090/";

class Home extends React.Component {
  state = {
    isLoading: false,
    topTenSightings: [
      {
        id: 1,
        hero: {
          id: 1,
          name: "Fake name",
          description: "Fake description",
          inOrganisation: [],
          superPower: {
            id: 1,
            name: "Fake Strength",
            description: "Fake power description",
          },
          villain: false,
        },
        location: {
          id: 1,
          name: "Fake name",
          description: "Fake description",
          address: "Fake address",
          latitude: 0.02,
          longitude: 1.99,
        },
        date: "2020-09-17",
      },
    ],
  };

  componentDidMount() {
    console.log("App is now mounted");
    this.loadTopSightings();
  }

  loadTopSightings() {
    this.setState({ isLoading: true });
    console.log("Loading topSightings");
    fetch(SERVICE_URL + "sighting/top10")
      .then((response) => response.json())
      .then((data) =>
        this.setState({ topTenSightings: data, isLoading: false })
      );
  }

  render() {
    return (
      <Container fluid style={{ padding: 0 }}>
        <Header />

        <Row>
          <Col sm={2} style={{ backgroundColor: "AliceBlue" }}>
            <Sidebar />
          </Col>

          <Col sm={9}>
            <NewsFeed topSightings={this.state.topTenSightings} />
          </Col>
        </Row>

        <Modal.Footer>
          <Footer />
        </Modal.Footer>
      </Container>
    );
  }
}

export default Home;
