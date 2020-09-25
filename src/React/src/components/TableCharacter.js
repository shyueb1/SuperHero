import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs"

const CharacterTableHeader = () => {
    return (
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Villain</th>
            <th>Superpower</th>
            <th></th>
            <th className="text-center"><BsFillTrashFill /></th>
        </tr>
    );
};

const CharacterTableRow = ({ character, toggleEdit, toggleDelete }) => {
    return (
        <tr>
            <td>{character.id}</td>
            <td>{character.name}</td>
            <td>{character.description}</td>
            <td>{character.villain === true ? "True" : "False"}</td>
            <td>{character.superPower === null ? "N/A" : character.superPower.name}</td>
            <td className="text-center">
                <Button onClick={toggleEdit} value={character.id}>
                    Edit
        </Button>
            </td>
            <td className="text-center">
                <Button onClick={toggleDelete} value={character.id}>
                    Delete
        </Button>
            </td>
        </tr>
    );
};

class TableCharacter extends Component {
    render() {
        const { characters } = this.props;
        return (
            <Table striped bordered responsive>
                <thead>
                    <CharacterTableHeader />
                </thead>
                <tbody>
                    {characters.map((character) => {
                        return (
                            <CharacterTableRow
                                character={character}
                                key={character.id}
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
export default TableCharacter;