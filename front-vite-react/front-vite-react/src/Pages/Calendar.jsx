import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';

import { tokenAtom } from '../Components/atoms/atoms';
import { API_URL } from '../Components/config';
import './Css/Calendar.css';

const Calendar = () => {
    const [token] = useAtom(tokenAtom);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_URL}/api/events/list`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }

                const data = await response.json();
                const allEvents = [...data.events, ...data.eventsAsParticipant];
                setEvents(allEvents);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
    }, [token]);

    const handleEventClick = (info) => {
        navigate(`/event/${info.event.id}`);
    };

    const handleCreateEvent = () => {
        navigate (`/event`);
    };

    return (
        <motion.div
            className="calendar-container"
            eventClick={handleCreateEvent}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="calendar-wrapper">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events.map(event => ({
                        id: event.id,
                        title: event.title,
                        date: event.date
                    }))}
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