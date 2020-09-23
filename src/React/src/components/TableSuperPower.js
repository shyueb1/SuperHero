import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

const SuperpowerTableHeader = () => {
    return (
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th></th>
            <th></th>
        </tr>
    );
};

const SuperpowerTableRow = ({ superpower, toggleEdit, toggleDelete }) => {
    return (
        <tr>
            <td>{superpower.superpowerId}</td>
            <td>{superpower.name}</td>
            <td>{superpower.description}</td>
            <td>
                <Button onClick={toggleEdit} value={superpower.superpowerId}>
                    Edit
        </Button>
            </td>
            <td>
                <Button onClick={toggleDelete} value={superpower.superpowerId}>
                    Delete
        </Button>
            </td>
        </tr>
    );
};

class SuperpowerTable extends Component {
    render() {
        const { superpowers } = this.props;
        return (
            <Table striped bordered responsive>
                <thead>
                    <SuperpowerTableHeader />
                </thead>
                <tbody>
                    {this.props.superpowers.map((superpower) => {
                        return (
                            <SuperpowerTableRow
                                superpower={superpower}
                                key={superpower.superpowerId}
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
export default SuperpowerTable;
