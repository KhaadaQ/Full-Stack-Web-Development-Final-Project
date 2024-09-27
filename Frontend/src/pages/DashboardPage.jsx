import React from 'react'
import { Link } from 'react-router-dom'

const DashboardPage = () => {
    return (
        <div>
            <h1>Welcome to main menu</h1>
            <p>Yo can:</p>
            <ul>
                <li>
                    <Link to="/characters">Manage characters</Link>
                </li>
                <li>
                    <Link to="/dungeons">View dungeons</Link>
                </li>
                <li>
                    <Link to="/items">View items</Link>
                </li>
            </ul>
        </div>
    )
}

export default DashboardPage