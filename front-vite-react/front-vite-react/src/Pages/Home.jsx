import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Css/Home.css'; // Arquivo de estilos

function Home() {
  const navigate = useNavigate();

  const handleCalendarClick = () => {
    navigate('/calendar');
  };
  const handleEventClick = () => {
    navigate('/event');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Your Agenda</h1>
        <p>This is your personal agenda where you can organize your tasks, events, and appointments.</p>
        <p>Use the navigation bar above to access different sections of the application.</p>
        <p>If you haven't registered yet, click on the "Register" link to create an account.</p>
      </div>
      <button onClick={handleEventClick}>Go to create a new event</button>
      <button className='calendar' onClick={handleCalendarClick}>Go to Calendar</button>
    </div>
  );
}

export default Home;
