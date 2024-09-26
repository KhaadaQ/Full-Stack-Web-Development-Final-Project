import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDungeons } from '../core/redux/actions/dungeonActions';

const DungeonsPage = () => {
  const dispatch = useDispatch();
  const dungeons = useSelector((state) => state.dungeons.dungeons); 
  
  useEffect(() => {
    const fetchDungeons = async () => {
      try {
        const response = await fetch('http://localhost:3000/wow/dungeons', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        dispatch(setDungeons(data)); 
      } catch (error) {
        console.error('Error al obtener las mazmorras:', error);
      }
    };

    fetchDungeons(); 
  }, [dispatch]); // El useEffect depende de dispatch para asegurar que no se ejecute en bucle

  return (
    <div>
      <h1>Listado de Mazmorras</h1>
      {dungeons.length > 0 ? (
        <ul>
          {dungeons.map((dungeon) => (
            <li key={dungeon.id}>{dungeon.name}</li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron mazmorras.</p>
      )}
    </div>
  );
};

export default DungeonsPage;
