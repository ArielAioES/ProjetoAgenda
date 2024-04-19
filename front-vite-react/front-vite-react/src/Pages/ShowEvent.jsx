import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { motion } from 'framer-motion'; // Importando o módulo motion

import { tokenAtom } from '../Components/atoms/atoms';
import { API_URL } from '../Components/config';
import '../Pages/Css/ShowEvent.css';

const ShowEvent = () => {
    const { id } = useParams();
    const [eventData, setEventData] = useState(null);
    const [token] = useAtom(tokenAtom);

    const fetchEventData = async () => {
        try {
            const response = await fetch(`${API_URL}/api/event/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch event data');
            }

            const eventData = await response.json();
            setEventData(eventData);
        } catch (error) {
            console.error(error);
        }
    };

    if (!eventData) {
        fetchEventData();
        return <div className="loading">Loading...</div>;
    }

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
            </motion.div>
        </motion.div>
    );
};

export default ShowEvent;