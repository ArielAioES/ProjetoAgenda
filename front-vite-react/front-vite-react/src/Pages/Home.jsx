import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import '../Pages/Css/Home.css';

function Home() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleCalendarClick = () => {
    navigate('/calendar');
  };
  const handleEventClick = () => {
    navigate('/event');
  };

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="home-content">
        <motion.h1
          id='test'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className='title-home'
        >
          Welcome to Your Agenda
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          This is your personal agenda where you can organize your tasks, events, and appointments.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Use the navigation bar above to access different sections of the application.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          If you haven't registered yet, click on the "Register" link to create an account.
        </motion.p>
      </div>
      {token && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <button className='btn-event' onClick={handleEventClick}>Go to create a new event</button>
          <button className='btn-calendar' onClick={handleCalendarClick}>Go to Calendar</button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Home;