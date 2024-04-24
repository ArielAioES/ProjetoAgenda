import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { motion } from 'framer-motion';
import { tokenAtom } from '../Components/atoms/atoms';
import { API_URL } from '../Components/config';
import '../Pages/Css/ShowEvent.css';
import EmailForm from '../Components/InviteUser';

const ShowEvent = () => {
    const { id } = useParams();
    const [eventData, setEventData] = useState(null);
    const [users] = useState([]);
    const [token] = useAtom(tokenAtom);
    const [showInviteModal, setShowInviteModal] = useState(false);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const eventResponse = await fetch(`${API_URL}/api/event/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (!eventResponse.ok) {
                    throw new Error('Falha ao buscar dados do evento');
                }

                const eventData = await eventResponse.json();
                setEventData(eventData);

            } catch (error) {
                console.error(error);
            }
        };

        fetchEventData();
    }, [id, token]);


    if (!eventData) {
        return <div className="loading">Carregando...</div>;
    }

    const handleInviteClick = () => {
        setShowInviteModal(true);
    };

    const handleCloseModal = () => {
        setShowInviteModal(false);
    };

    return (
        <motion.div
            className="event-details-container"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="event-title">{eventData.title}</h1>
            <motion.div
                className="event-details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <h3>Data: {new Date(eventData.date).toLocaleDateString()}</h3>
                <h3>Horário: {(eventData.time)}</h3>
                <h3>Duração: {eventData.duration} horas</h3>
                <h3>Descrição do evento: {eventData.description}</h3>
                <h3>ID do evento: {eventData.id}</h3>

                <button onClick={handleInviteClick}>Enviar Convite</button>
                {showInviteModal && <EmailForm onClose={handleCloseModal}/>}

                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.username}</li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default ShowEvent;
