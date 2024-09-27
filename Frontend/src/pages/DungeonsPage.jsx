import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDungeons } from '../core/redux/actions/dungeonActions';
import DungeonList from '../components/DungeonList';
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
      <h1>Dungeons List</h1>
      {dungeons && dungeons.length > 0 ? (
        <DungeonList dungeons={dungeons} />
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={() => navigate('/dashboard')}>Back to main menu</button>
    </div>
  );
};

export default DungeonsPage;
