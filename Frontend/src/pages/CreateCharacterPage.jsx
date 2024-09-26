import React, { useState } from 'react'

const CreateCharacterPage = () => {
    const [name, setName] = useState('');
    const [classType, setClassType] = useState('');
    const [level, setLevel] = useState(1);
    const handleCreateCharacter = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
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
                alert('Personaje creado con éxito');
            } else {
                alert('Error al crear el personaje');
            }
        } catch (error) {
            console.error('Error al crear el personaje:', error);
        }
    };
    return (
        <div>
            <h1>Crear Personaje</h1>
            <form onSubmit={handleCreateCharacter}>
                <div>
                    <label>Nombre del personaje:</label>
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
                <button type="submit">Crear Personaje</button>
            </form>
        </div>
    )
}

export default CreateCharacterPage