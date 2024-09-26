import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDungeons } from '../core/redux/actions/dungeonActions';
import { useNavigate } from 'react-router-dom';

const DungeonsPage = () => {
  const dispatch = useDispatch();
  const dungeons = useSelector((state) => state.dungeons.dungeons);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDungeons = async () => {
      try {
        const response = await fetch('http://localhost:3000/wow/dungeons', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        dispatch(setDungeons(data.instances));
      } catch (error) {
        console.error('Error al obtener las mazmorras:', error);
      }
    };

    fetchDungeons();
  }, [dispatch]);

  return (
    <div>
      <h1>Listado de Mazmorras</h1>
      {dungeons && dungeons.length > 0 ? (
        <ul>
          {dungeons.map((dungeon) => (
            <li key={dungeon.id}>{dungeon.name}</li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron mazmorras.</p>
      )}
      <button onClick={() => navigate('/dashboard')}>Volver al Dashboard</button>
    </div>
  );
};

export default DungeonsPage;
