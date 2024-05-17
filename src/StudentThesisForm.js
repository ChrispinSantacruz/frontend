import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentThesisForm() {
    const [theses, setTheses] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentThesisId, setCurrentThesisId] = useState(null);

    useEffect(() => {
        fetchTheses();
    }, []);

    const fetchTheses = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/theses/', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTheses(response.data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        try {
            if (editMode) {
                await axios.put(`http://127.0.0.1:8000/api/theses/${currentThesisId}/`, 
                    { title, description },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await axios.post('http://127.0.0.1:8000/api/theses/', 
                    { title, description },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            fetchTheses();
            resetForm();
        } catch (error) {
            console.error('Error al crear/modificar la tesis', error);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://127.0.0.1:8000/api/theses/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTheses();
        } catch (error) {
            console.error('Error al eliminar la tesis', error);
        }
    };

    const handleEdit = (thesis) => {
        setTitle(thesis.title);
        setDescription(thesis.description);
        setEditMode(true);
        setCurrentThesisId(thesis.id);
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setEditMode(false);
        setCurrentThesisId(null);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <button type="submit">{editMode ? 'Update Thesis' : 'Create Thesis'}</button>
                {editMode && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>

            <h2>Your Theses</h2>
            <ul>
                {theses.map(thesis => (
                    <li key={thesis.id}>
                        {thesis.title} - {thesis.description}
                        <button onClick={() => handleEdit(thesis)}>Edit</button>
                        <button onClick={() => handleDelete(thesis.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentThesisForm;
