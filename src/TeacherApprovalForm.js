import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeacherApprovalForm() {
    const [theses, setTheses] = useState([]);

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

    const handleApproval = async (id, isApproved) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://127.0.0.1:8000/api/approvals/', 
                { thesis: id, is_approved: isApproved },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchTheses();
        } catch (error) {
            console.error('Error al aprobar/rechazar la tesis', error);
        }
    };

    return (
        <div>
            <h2>Theses to Approve</h2>
            <ul>
                {theses.map(thesis => (
                    <li key={thesis.id}>
                        {thesis.title} - {thesis.description}
                        <button onClick={() => handleApproval(thesis.id, true)}>Approve</button>
                        <button onClick={() => handleApproval(thesis.id, false)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TeacherApprovalForm;
