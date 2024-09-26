const mysql = require('mysql2/promise');
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const createCharacter = async (name, classType, level, userId) => {
  const [result] = await connection.query(
    'INSERT INTO characters (name, class, level, user_id) VALUES (?, ?, ?, ?)',
    [name, classType, level, userId]
  );
  return result.insertId;
};

const getCharactersByUserId = async (userId) => {
  const [rows] = await connection.query(
    'SELECT * FROM characters WHERE user_id = ?',
    [userId]
  );
  return rows;
};

const updateCharacter = async (characterId, name, classType, level) => {
  const [result] = await connection.query(
    'UPDATE characters SET name = ?, class = ?, level = ? WHERE id = ?',
    [name, classType, level, characterId]
  );
  return result.affectedRows > 0;
};

const deleteCharacter = async (characterId) => {
  const [result] = await connection.query(
    'DELETE FROM characters WHERE id = ?',
    [characterId]
  );
  return result.affectedRows > 0;
};

module.exports = {
  createCharacter,
  getCharactersByUserId,
  updateCharacter,
  deleteCharacter,
};
