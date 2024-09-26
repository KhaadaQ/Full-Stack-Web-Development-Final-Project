import React, { useEffect, useState } from 'react';

function CharactersPage() {
  const [characters, setCharacters] = useState([]);

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

  return (
    <div>
      <h1>Mis Personajes</h1>
      {characters.length > 0 ? (
        <ul>
          {characters.map((character) => (
            <li key={character.id}>
              {character.name} - {character.classType} - Nivel: {character.level}
              <button onClick={() => handleDeleteCharacter(character.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes personajes creados.</p>
      )}
    </div>
  );
}

export default CharactersPage;
