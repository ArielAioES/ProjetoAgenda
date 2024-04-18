import React from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';

import { tokenAtom } from '../Components/atoms/atoms';


import { API_URL } from '../Components/config';


import './Css/Calendar.css';


const Calendar = () => {
    const [token] = useAtom(tokenAtom); // Obtendo o token do átomo
    const navigate = useNavigate();

    // Verifica se há um token ao montar o componente
    if (!token) {
        navigate('/login');
    }

    const fetchUser = () => {
        fetch(`${API_URL}/api/user/events/{id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    };

    const handleEventClick = (info) => {
        navigate(`/event/${info.event.id}`);
    };

    return (
        <motion.div
            className="calendar-container"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="calendar-wrapper">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={[
                        { id: '1', title: 'Evento 1', date: '2024-04-01' },
                        { id: '2', title: 'Evento 2', date: '2024-07-24' }
                    ]}
                    eventClick={handleEventClick}
                    eventContent={renderEventContent}
                    dayCellContent={renderDayCellContent}
                />
            </div>
        </motion.div>
    );
};

const renderEventContent = (eventInfo) => {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <div>{eventInfo.event.title}</div>
        </motion.div>
    );
};

const renderDayCellContent = (cellInfo) => {
    return (
        <div className="day-cell">
            {cellInfo.dayNumberText}
        </div>
    );
};

export default Calendar;
