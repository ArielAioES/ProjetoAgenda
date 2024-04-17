import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importando motion do framer-motion
import './Css/Calendar.css';

const CalendarHeader = ({ currentDate, prevMonth, nextMonth }) => {
    return (
        <motion.div
            className="header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <button className="nav-btn" onClick={prevMonth}>&lt;</button>
            <h2 className="month">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <button className="nav-btn" onClick={nextMonth}>&gt;</button>
        </motion.div>
    );
};

const DayNames = () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
        <motion.div
            className="day-names"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {dayNames.map((day, index) => (
                <div key={index} className="day-name">{day}</div>
            ))}
        </motion.div>
    );
};

const Day = ({ day }) => {
    return (
        <Link to={`/day/${day}`} className="day-link">
            <motion.div
                className="day"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                {day}
            </motion.div>
        </Link>
    );
};

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []);

    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const renderDays = () => {
        const days = [];
        const totalDays = daysInMonth(currentDate);
        const firstDay = firstDayOfMonth(currentDate);

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty"></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            days.push(<Day key={day} day={day} />);
        }

        return days;
    };

    const prevMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
    };

    return (
        <motion.div
            className="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="title">
                <h4>Calendar</h4>
            </div>
            <CalendarHeader currentDate={currentDate} prevMonth={prevMonth} nextMonth={nextMonth} />
            <DayNames />
            <div className="days">
                {renderDays()}
            </div>
        </motion.div>
    );
};

export default Calendar;
