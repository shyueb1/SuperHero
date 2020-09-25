import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs"

const SightingTableHeader = () => {
  return (
    <tr>
      <th>#</th>
      <th>Hero</th>
      <th>Location</th>
      <th>Date</th>
      <th></th>
      <th className="text-center"><BsFillTrashFill /></th>
    </tr>
  );
};

const SightingTableRow = ({ sighting, toggleEdit, toggleDelete }) => {
  return (
    <tr>
      <td>{sighting.id}</td>
      <td>{sighting.hero.name}</td>
      <td>{sighting.location === null ? "N/A" : sighting.location.name}</td>
      <td>{sighting.date}</td>
      <td className="text-center">
        <Button onClick={toggleEdit} value={sighting.id}>
          Edit
        </Button>
      </td>
      <td className="text-center">
        <Button onClick={toggleDelete} value={sighting.id}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

class TableSighting extends Component {
  render() {
    const { sightings } = this.props;
    return (
      <Table striped bordered responsive>
        <thead>
          <SightingTableHeader />
        </thead>
        <tbody>
          {sightings.map((sighting) => {
            return (
              <SightingTableRow
                sighting={sighting}
                key={sighting.id}
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
export default TableSighting;
