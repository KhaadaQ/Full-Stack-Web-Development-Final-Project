import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
          body: JSON.stringify({ name: name || '', classType: classType || '', level: level || 1 }), 
        });

        const data = await response.json();
        if (data.message === 'Personaje actualizado') {
          const updatedCharacters = characters.map((char) =>
            char.id === characterToEdit.id ? { ...char, name, classType, level } : char
          );
          setCharacters(updatedCharacters);
          setEditMode(false);
          setCharacterToEdit(null);
          setName('');
          setClassType('');
          setLevel(1);
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
          body: JSON.stringify({ name: name || '', classType: classType || '', level: level || 1 }),
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
      }
    } catch (error) {
      console.error('Error al eliminar el personaje:', error);
    }
  };

  const handleEditCharacter = (character) => {
    setEditMode(true);
    setCharacterToEdit(character);
    setName(character.name || ''); 
    setClassType(character.classType || ''); 
    setLevel(character.level || 1); 
  };

  return (
    <div className="characters-page">
      <h1>Manage Characters</h1>

      <div className="character-form">
        <h2>{editMode ? 'Editar Personaje' : 'Crear Personaje'}</h2>
        <form onSubmit={handleSaveCharacter}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Class:</label>
            <input
              type="text"
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Level:</label>
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
      </div>

      <div className="character-list">
        <h2>Characters list</h2>
        {characters.length > 0 ? (
          <ul>
            {characters.map((character) => (
              <li key={character.id}>
                {character.name} - {character.classType} - Level: {character.level}
                <button onClick={() => handleEditCharacter(character)}>Edit</button>
                <button onClick={() => handleDeleteCharacter(character.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <button onClick={() => navigate('/dashboard')}>Back to main menu</button>
    </div>
  );
}

export default CharactersPage;
