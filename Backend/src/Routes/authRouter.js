const express = require('express');
const { register, login } = require('../Controllers/authController');

const router = express.Router();

// Ruta para registro
router.post('/register', register);

// Ruta para login
router.post('/login', login);

module.exports = router;
