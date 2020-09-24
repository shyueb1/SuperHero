import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

const SightingTableHeader = () => {
    return (
        <tr>
            <th>#</th>
            <th>Hero</th>
            <th>Location</th>
            <th>Date</th>
            <th></th>
            <th></th>
        </tr>
    );
};

const SightingTableRow = ({ sighting, toggleEdit, toggleDelete }) => {
    return (
        <tr>
            <td>{sighting.id}</td>
            <td>{sighting.hero.name}</td>
            <td>{sighting.location.name}</td>
            <td>{sighting.date}</td>
            <td>
                <Button onClick={toggleEdit} value={sighting.id}>
                    Edit
        </Button>
            </td>
            <td>
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