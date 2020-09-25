import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import {
    Container,
    Row,
    Col,
    Modal
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "AIzaSyC0c8sOcwNZHv1MGg_kF8lgt5Sf52g4Hm4";
const SERVICE_URL = "http://localhost:8090/";
export class MapContainer extends React.Component {

    state = {
        locations: []
    }

    componentDidMount() {
        fetch(`${SERVICE_URL}location`)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                this.setState({ locations: data });
            });
    }

    render() {
        let bounds = new this.props.google.maps.LatLngBounds();
        this.state.locations.forEach(loc => {
            bounds.extend({ lat: loc.latitude, lng: loc.longitude });
        })

        return (
            <Container fluid style={{ padding: 0 }}>
                {/* <Container fluid> */}
                <Header />
                <Row>
                    <Col sm={3} style={{ backgroundColor: "AliceBlue" }}>
                        <Sidebar />
                    </Col>

                    <Col sm={9} style={{ height: "600px", width: "800px" }}>
                        <Map bounds={bounds} google={this.props.google} zoom={14} style={{ height: "600px", width: "800px" }}>
                            {this.state.locations.map(location => {
                                return (
                                    <Marker name={location.name}
                                        position={{ lat: location.latitude, lng: location.longitude }} />
                                )
                            })}

                        </Map>
                    </Col>
                </Row>
                <Modal.Footer>
                    <Footer />
                </Modal.Footer>
            </Container >
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (API_KEY)
})(MapContainer)