import React, { Component } from "react";
import { Card, CardDeck, Col, Row } from "react-bootstrap";

class NewsFeed extends Component {
    render() {
        // const { sightings } = this.props;
        return (
            <CardDeck>Latest Superhero Sightings

                {/* </ItemCard> */}
            </CardDeck >
        )
    }
}

export default NewsFeed;

const ItemCard = () => {
    return (
        <Col>
            <Row>
                <Card>
                    <Card.Title></Card.Title>
                    {/* Will need 10 latest sightings instead of pre-allocated ones.. */}
                    <Card.Text>1</Card.Text>
                    <Card.Text>2</Card.Text>
                    <Card.Text>3</Card.Text>
                    <Card.Text>4</Card.Text>
                    <Card.Text>5</Card.Text>
                    <Card.Text>6</Card.Text>
                    <Card.Text>7</Card.Text>
                    <Card.Text>8</Card.Text>
                    <Card.Text>9</Card.Text>
                    <Card.Text>10</Card.Text>
                </Card>
            </Row>
        </Col>
    )
}