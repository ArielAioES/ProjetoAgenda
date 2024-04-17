import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importando Link do React Router
import './Css/Calendar.css'; // Arquivo de estilos

const CalendarHeader = ({ currentDate, prevMonth, nextMonth }) => {
    return (
        <div className="header">
            <button className="nav-btn" onClick={prevMonth}>&lt;</button>
            <h2 className="month">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <button className="nav-btn" onClick={nextMonth}>&gt;</button>
        </div>
    );
};

const DayNames = () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
        <div className="day-names">
            {dayNames.map((day, index) => (
                <div key={index} className="day-name">{day}</div>
            ))}
        </div>
    );
};

const Day = ({ day }) => {
    return (
        <Link to={`/day/${day}`} className="day-link">
            <div className="day">{day}</div>
        </Link>
    );
};

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

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
        <div className="calendar">
            <div className="title">
                <h4>Calendar</h4>
            </div>
            <CalendarHeader currentDate={currentDate} prevMonth={prevMonth} nextMonth={nextMonth} />
            <DayNames />
            <div className="days">
                {renderDays()}
            </div>
        </div>
    );
};


export default Calendar;
