import React from "react";
import { Link } from "react-router-dom";
import {
    Nav
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar() {
    return (
        <Nav defaultActiveKey="#home" className="flex-column ml-4">
            <Nav.Item>
                <Link to="/">Home</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/character">Superheroes and Supervillains</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/superpower">Superpowers</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/location">Locations</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/organisation">Organisations</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/sighting">Sightings</Link>
            </Nav.Item>
        </Nav>
    );
}
export default Sidebar;