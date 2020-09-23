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
                    <Link to="#aboutus">About Us</Link>
                </Col>
                <Col sm={2} className="text-center">
                    <Link to="#faqs">FAQs</Link>
                </Col>
                <Col sm={8} className="text-right">
                    <Icon.Facebook />
                    <Icon.Instagram />
                    <Icon.Twitter />
                </Col>
            </Row>
        </Container>
    );
}
export default Footer;