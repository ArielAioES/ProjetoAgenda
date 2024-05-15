import React, { useState } from 'react';
import { API_URL } from '../Components/config';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { tokenAtom } from '../Components/atoms/atoms';
import { useNavigate } from 'react-router-dom';

const JoinEvent = () => {
    const { id } = useParams();
    const [token] = useAtom(tokenAtom);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleJoinEvent = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/events/join/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Falha ao participar do evento');
            }

            navigate('/calendar');
        } catch (error) {
            setError(`Erro: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        navigate('/login');
    }

    return (
        <div>
            <h1>Participar do Evento</h1>
            <button onClick={handleJoinEvent} disabled={loading}>
                {loading ? 'Aguarde...' : 'Participar do evento'}
            </button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default JoinEvent;
