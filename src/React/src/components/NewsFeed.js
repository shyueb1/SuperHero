import React, { Component } from "react";
import { Card, CardDeck, Col, Row } from "react-bootstrap";

class NewsFeed extends Component {
  render() {
    const { topSightings } = this.props;
    return (
      <CardDeck>
        {topSightings.map((sighting) => {
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
          <Card.Title>{sighting.hero.name}</Card.Title>
          <Card.Text>{sighting.location.name}</Card.Text>
          <Card.Text>{sighting.date}</Card.Text>
        </Card>
      </Row>
      <br />
    </Col>
  );
};
