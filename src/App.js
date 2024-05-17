import React, { useEffect, useState } from 'react';
import './App.css';
import StudentThesisForm from './StudentThesisForm';
import TeacherApprovalForm from './TeacherApprovalForm';
import LoginForm from './LoginForm';
import axios from 'axios';

function App() {
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No se encontró el token');
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/role/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRole(response.data.role);
            } catch (error) {
                console.error('Error al obtener el rol', error);
                setError('Error de red o token inválido');
            }
        };

        fetchRole();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Thesis Management</h1>
                {error && <p>{error}</p>}
                {!role && <LoginForm />}
                {role === 'student' && (
                    <div>
                        <h2>Estudiante</h2>
                        <StudentThesisForm />
                    </div>
                )}
                {role === 'teacher' && (
                    <div>
                        <h2>Profesor</h2>
                        <TeacherApprovalForm />
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
