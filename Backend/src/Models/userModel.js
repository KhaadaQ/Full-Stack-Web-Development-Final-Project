const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Conexión a la base de datos usando mysql2
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Función para crear un nuevo usuario
const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await connection.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  return result.insertId;
};

// Función para encontrar un usuario por email
const findUserByEmail = async (email) => {
  const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail
};
