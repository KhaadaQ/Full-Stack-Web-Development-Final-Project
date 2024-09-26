import React, { useState } from 'react'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Lógica para autenticar al usuario
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.token) {
                // Guardar el token en el localStorage
                localStorage.setItem('token', data.token);

                console.log('Usuario autenticado:', data);
            } else {
                alert('Login fallido: ' + data.message);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Iniciar Sesión</button>
                </form>
            </div>
        );
    }
}

export default LoginPage