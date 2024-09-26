import React, { useEffect, useState } from 'react'

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:3000/wow/items', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`, 
                    },
                });

                const data = await response.json();
                setItems(data.items);
            } catch (error) {
                console.error('Error al obtener los items:', error);
            }
        };

        fetchItems();
    }, []);
    return (
        <div>
      <h1>Items y Loot</h1>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron items.</p>
      )}
    </div>
    )
}

export default ItemsPage