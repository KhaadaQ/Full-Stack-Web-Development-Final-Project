import React from 'react'

const CharacterCard = ({ character, onDelete }) => {
    return (
        <div>
            <h3>{character.name}</h3>
            <p>Clase: {character.classType}</p>
            <p>Nivel: {character.level}</p>
            <button onClick={() => onDelete(character.id)}>Eliminar</button>
        </div>
    )
}

export default CharacterCard