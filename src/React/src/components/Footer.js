import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import {
    Row, Col, Container
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
    return (
        <Container fluid>
            <Row>
                <Col sm={2} className="text-center">
                    <Link to="/aboutus">About Us</Link>
                </Col>
                <Col sm={2} className="text-center">
                    <Link to="/faqs">FAQs</Link>
                </Col>
                <Col sm={8} className="text-right">
                    <a href="https://www.facebook.com/FromSuperheroes/"><Icon.Facebook /></a>
                    &nbsp;
                    <a href="https://www.instagram.com/comicbook/?hl=en"><Icon.Instagram /></a>
                    &nbsp;
                    <a href="https://twitter.com/FromSuperheroes?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"><Icon.Twitter /></a>
                </Col>
            </Row>
        </Container>
    );
}
export default Footer;