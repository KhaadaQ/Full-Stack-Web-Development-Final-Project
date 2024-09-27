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

  return (
    <div className="items-page">
      <h1>Items</h1>
      {items.length > 0 ? (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id}>
              <ItemCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found</p>
      )}
      <button onClick={() => navigate('/dashboard')}>Back to main menu</button>
    </div>
  );
};

export default ItemsPage;
