const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../Models/userModel');
const sendMail = require('../Services/emailService'); // Importar el servicio de envío de correo
const emailSignupTemplate = require('../Templates/registerEmail'); // Importar el template de email

// Registro de usuario
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear nuevo usuario en la base de datos
    const userId = await createUser(username, email, password);

    // Enviar correo de agradecimiento por registrarse
    const subject = '¡Gracias por registrarte en nuestra aplicación!';
    const emailContent = emailSignupTemplate
      .replaceAll('{{name}}', username)
      .replaceAll('{{your_website_name}}', 'World of Warcraft API App') 
      .replaceAll('[Your Website URL]', 'https://yourwebsite.com') 
      .replaceAll('[Contact URL]', 'https://yourwebsite.com/contact'); 

    await sendMail(email, subject, emailContent); // Enviar el correo

    // Responder con éxito
    res.status(201).json({ message: 'Usuario registrado y correo enviado', userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
