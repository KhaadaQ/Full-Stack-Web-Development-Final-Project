import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <h1>Bienvenido a nuestra aplicación</h1>
      <p>Si ya tienes una cuenta, inicia sesión. Si no, regístrate ahora.</p>
      <div>
        <Link to="/login">
          <button>Iniciar Sesión</button>
        </Link>
        <Link to="/register">
          <button>Registrarse</button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage