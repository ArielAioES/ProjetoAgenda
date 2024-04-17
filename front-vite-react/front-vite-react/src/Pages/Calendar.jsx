import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { motion } from 'framer-motion';

import './Css/Calendar.css';

const Calendar = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }

        fetchUser();
    }, [navigate]);

    const fetchUser = () => {
        fetch("http://127.0.0.1:8000/api/user/events/{id}", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log('atualizou');
    };

    const handleEventClick = (info) => {
        navigate(`/event/${info.event.id}`);
        console.log('Evento clicado:', info.event.id);
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