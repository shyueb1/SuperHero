import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs"

const OrganisationTableHeader = () => {
    return (
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Telephone</th>
            <th></th>
            <th className="text-center"><BsFillTrashFill /></th>
        </tr>
    );
};

const OrganisationTableRow = ({ organisation, toggleEdit, toggleDelete }) => {
    return (
        <tr>
            <td>{organisation.id}</td>
            <td>{organisation.name}</td>
            <td>{organisation.description}</td>
            <td>{organisation.location === null ? "Unknown" : organisation.location.name}</td>
            <td>{organisation.telephone}</td>
            <td className="text-center">
                <Button onClick={toggleEdit} value={organisation.id}>
                    Edit
        </Button>
            </td>
            <td className="text-center">
                <Button onClick={toggleDelete} value={organisation.id}>
                    Delete
        </Button>
            </td>
        </tr>
    );
};

class TableOrganisation extends Component {
    render() {
        const { organisations } = this.props;
        return (
            <Table striped bordered responsive>
                <thead>
                    <OrganisationTableHeader />
                </thead>
                <tbody>
                    {organisations.map((organisation) => {
                        return (
                            <OrganisationTableRow
                                organisation={organisation}
                                key={organisation.id}
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
export default TableOrganisation;