import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LocationTableHeader = () => {
  return (
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Description</th>
      <th>Address</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th></th>
      <th>
        <Link to="/maps"><Button>Locations on Map</Button></Link>
      </th>
    </tr>
  );
};

const LocationTableRow = ({ location, toggleEdit, toggleDelete }) => {
  return (
    <tr>
      <td>{location.id}</td>
      <td>{location.name}</td>
      <td>{location.description}</td>
      <td>{location.address}</td>
      <td>{location.latitude}</td>
      <td>{location.longitude}</td>
      <td>
        <Button onClick={toggleEdit} value={location.id}>
          Edit
        </Button>
      </td>
      <td>
        <Button onClick={toggleDelete} value={location.id}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

class LocationTable extends Component {
  render() {
    const { locations } = this.props;
    return (
      <Table striped bordered responsive>
        <thead>
          <LocationTableHeader />
        </thead>
        <tbody>
          {locations.map((location) => {
            return (
              <LocationTableRow
                location={location}
                key={location.id}
                toggleEdit={this.props.handleEdit}
                toggleDelete={this.props.handleDelete}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}
export default LocationTable;
