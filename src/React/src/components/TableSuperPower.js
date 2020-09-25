import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs"

const SuperpowerTableHeader = () => {
    return (
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th></th>
            <th className="text-center"><BsFillTrashFill /></th>
        </tr>
    );
};

const SuperpowerTableRow = ({ superpower, toggleEdit, toggleDelete }) => {
    return (
        <tr>
            <td>{superpower.id}</td>
            <td>{superpower.name}</td>
            <td>{superpower.description}</td>
            <td className="text-center">
                <Button onClick={toggleEdit} value={superpower.id}>
                    Edit
        </Button>
            </td>
            <td className="text-center">
                <Button onClick={toggleDelete} value={superpower.id}>
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
                                key={superpower.id}
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