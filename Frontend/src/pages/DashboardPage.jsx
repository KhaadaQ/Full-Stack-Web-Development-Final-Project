import React from 'react'
import { Link } from 'react-router-dom'

const DashboardPage = () => {
    return (
        <div>
            <h1>Bienvenido al Dashboard</h1>
            <p>Elige una de las siguientes opciones:</p>
            <ul>
                <li>
                    <Link to="/characters">Gestionar Personajes</Link>
                </li>
                <li>
                    <Link to="/dungeons">Ver Mazmorras</Link>
                </li>
                <li>
                    <Link to="/items">Ver Items y Loot</Link>
                </li>
            </ul>
        </div>
    )
}

export default DashboardPage