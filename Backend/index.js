const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();  // Cargar las variables de entorno desde el archivo .env
const authRouter = require('./src/Routes/authRouter');
const wowRouter = require('./src/Routes/wowRouter');
const characterRouter = require('./src/Routes/characterRouter');

const app = express();
const PORT = process.env.PORT || 3000;  // Usa el puerto 3000 o el definido en .env

// Middleware
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/wow', wowRouter);
app.use('/characters', characterRouter);

// Conectar a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,         
  user: process.env.DB_USER,         
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME      
});

// Conexión a MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL: ', err);
    process.exit(1);  // Termina la aplicación si falla la conexión
  }
  console.log('Conexión exitosa a MySQL');
});

// Endpoint simple para probar el servidor
app.get("/", (req, res) => {
  res.send("Servidor de WoW funcionando");
});

// Escuchar en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

