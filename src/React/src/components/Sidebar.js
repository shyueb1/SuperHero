import React from "react";
import { Link } from "react-router-dom";
import {
    Nav
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TiHome, TiLocation } from "react-icons/ti";
import { BsPersonFill, BsBuilding, BsFillLightningFill, BsEyeFill } from "react-icons/bs";

function Sidebar() {
    return (
        <Nav defaultActiveKey="#home" className="flex-column ml-4" >
            <br />
            <Nav.Item>
                <Link to="/"><TiHome /> Home</Link>
            </Nav.Item>
            <br />
            <Nav.Item>
                <Link to="/character"><BsPersonFill /> Superheroes and Supervillains</Link>
            </Nav.Item>
            <br />
            <Nav.Item>
                <Link to="/superpower"><BsFillLightningFill /> Superpowers</Link>
            </Nav.Item>
            <br />
            <Nav.Item>
                <Link to="/location"><TiLocation /> Locations</Link>
            </Nav.Item>
            <br />
            <Nav.Item>
                <Link to="/organisation"><BsBuilding /> Organisations</Link>
            </Nav.Item>
            <br />
            <Nav.Item>
                <Link to="/sighting"><BsEyeFill /> Sightings</Link>
            </Nav.Item>
        </ Nav>
    );
}
export default Sidebar;