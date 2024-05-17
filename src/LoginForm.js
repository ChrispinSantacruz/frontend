import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Por defecto, el rol es estudiante
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            // Enviamos el nombre de usuario y la contraseña al backend
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username,
                password,
            });
            const token = response.data.access;
            localStorage.setItem('token', token);
            // Aquí podrías realizar más acciones después de iniciar sesión, como redireccionar a otra página
        } catch (error) {
            console.error('Error de inicio de sesión', error);
            setError('Nombre de usuario o contraseña incorrectos');
        }
    };

    return (
        <div>
            <h2>Inicio de sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Nombre de usuario:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Rol:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="student">Estudiante</option>
                        <option value="teacher">Docente</option>
                    </select>
                </div>
                <button type="submit">Iniciar sesión</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default LoginForm;