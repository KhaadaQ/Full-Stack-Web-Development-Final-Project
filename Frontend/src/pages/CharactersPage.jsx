import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard'; 

function CharactersPage() {
    const [characters, setCharacters] = useState([]);
    const [name, setName] = useState('');
    const [classType, setClassType] = useState('');
    const [level, setLevel] = useState(1);
    const [editMode, setEditMode] = useState(false);
    const [characterToEdit, setCharacterToEdit] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/characters', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setCharacters(data);
            } catch (error) {
                console.error('Error al obtener los personajes:', error);
            }
        };

        fetchCharacters();
    }, []);

    const handleSaveCharacter = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (editMode) {
            try {
                const response = await fetch(`http://localhost:3000/characters/${characterToEdit.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name, classType, level }),
                });

                const data = await response.json();
                if (data.message === 'Personaje actualizado') {
                    const updatedCharacters = characters.map((char) =>
                        char.id === characterToEdit.id ? { ...char, name, classType, level } : char
                    );
                    setCharacters(updatedCharacters);
                    alert('Personaje actualizado con éxito');
                    setEditMode(false);
                    setCharacterToEdit(null);
                    setName('');
                    setClassType('');
                    setLevel(1);
                } else {
                    alert('Error al actualizar el personaje');
                }
            } catch (error) {
                console.error('Error al actualizar el personaje:', error);
            }
        } else {
            try {
                const response = await fetch('http://localhost:3000/characters/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name, classType, level }),
                });

                const data = await response.json();
                if (data.characterId) {
                    const newCharacter = {
                        id: data.characterId,
                        name,
                        classType,
                        level,
                    };
                    setCharacters([...characters, newCharacter]);
                    setName('');
                    setClassType('');
                    setLevel(1);
                    alert('Personaje creado con éxito');
                } else {
                    alert('Error al crear el personaje');
                }
            } catch (error) {
                console.error('Error al crear el personaje:', error);
            }
        }
    };

    const handleDeleteCharacter = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/characters/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.message === 'Personaje eliminado') {
                setCharacters(characters.filter((character) => character.id !== id));
                alert('Personaje eliminado con éxito');
            } else {
                alert('Error al eliminar el personaje');
            }
        } catch (error) {
            console.error('Error al eliminar el personaje:', error);
        }
    };

    const handleEditCharacter = (character) => {
        setEditMode(true);
        setCharacterToEdit(character);
        setName(character.name);
        setClassType(character.classType);
        setLevel(character.level);
    };

    return (
        <div>
            <h1>Gestionar Personajes</h1>

            <h2>{editMode ? 'Editar Personaje' : 'Crear Personaje'}</h2>
            <form onSubmit={handleSaveCharacter}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Clase:</label>
                    <input
                        type="text"
                        value={classType}
                        onChange={(e) => setClassType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nivel:</label>
                    <input
                        type="number"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                        min="1"
                        max="100"
                    />
                </div>
                <button type="submit">{editMode ? 'Actualizar Personaje' : 'Crear Personaje'}</button>
            </form>

            <h2>Lista de personajes</h2>
            {characters.length > 0 ? (
                <div>
                    {characters.map((character) => (
                        <CharacterCard
                            key={character.id || character.characterId}
                            character={character}
                            onDelete={handleDeleteCharacter}
                            onEdit={handleEditCharacter}
                        />
                    ))}
                </div>
            ) : (
                <p>No tienes personajes creados.</p>
            )}

            <button onClick={() => navigate('/dashboard')}>Volver al Dashboard</button>
        </div>
    );
}

export default CharactersPage;
