import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

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
                setItems(data.item_classes || []);
            } catch (error) {
                console.error('Error al obtener los items:', error);
            }
        };

        fetchItems();
    }, []);

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div>
            <h1>Items y Loot</h1>
            {items.length > 0 ? (
                <div>
                    {items.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <p>No se encontraron items.</p>
            )}
            <button onClick={goToDashboard}>Volver a Dashboard</button>
        </div>
    );
};

export default ItemsPage;
