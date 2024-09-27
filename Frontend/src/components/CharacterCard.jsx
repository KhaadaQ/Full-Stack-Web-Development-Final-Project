import React from 'react'

const CharacterCard = ({ character, onDelete }) => {
    return (
        <div>
            <h3>{character.name}</h3>
            <p>Class: {character.classType}</p>
            <p>Level: {character.level}</p>
            <button onClick={() => onDelete(character.id)}>Delete</button>
        </div>
    )
}

export default CharacterCard