import React, { Component } from "react";
import { Card, CardDeck, Col, Row } from "react-bootstrap";

class NewsFeed extends Component {
  render() {
    const { sightings } = this.props;
    return (
      <CardDeck>
        {sightings.map((sighting) => {
          return <ItemCard sighting={sighting} />;
        })}
      </CardDeck>
    );
  }
}

export default NewsFeed;

const ItemCard = ({ sighting }) => {
  return (
    <Col sm={6}>
      <Row>
        <Card className="text-center mr-4 mt-4 ml-4 mb-4">
          <Card.Title>{sighting.hero}</Card.Title>
          <Card.Text>{sighting.location}</Card.Text>
          <Card.Text>{sighting.date}</Card.Text>
        </Card>
      </Row>
      <br />
    </Col>
  );
};
