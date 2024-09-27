import React, { useState } from 'react'

const UpdateCharacterPage = () => {
    const [name, setName] = useState('');
  const [classType, setClassType] = useState('');
  const [level, setLevel] = useState(1);
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/characters/${match.params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const character = await response.json();
        setName(character.name);
        setClassType(character.classType);
        setLevel(character.level);
      } catch (error) {
        console.error('Error al obtener el personaje:', error);
      }
    };

    fetchCharacter();
  }, [match.params.id]);

  const handleUpdateCharacter = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/characters/update/${match.params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, classType, level }),
      });

      const data = await response.json();

      if (data.message === 'Personaje actualizado') {
        alert('Personaje actualizado con éxito');
      } else {
        alert('Error al actualizar el personaje');
      }
    } catch (error) {
      console.error('Error al actualizar el personaje:', error);
    }
  };
  return (
    <div>
      <h1>Update Character</h1>
      <form onSubmit={handleUpdateCharacter}>
        <div>
          <label>Character's name:</label>
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
        <button type="submit">Update Character</button>
      </form>
    </div>
  )
}

export default UpdateCharacterPage