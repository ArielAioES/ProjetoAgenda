import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';

import { tokenAtom } from '../Components/atoms/atoms';

import '../Pages/Css/Home.css';

const Home = () => {
  const [token] = useAtom(tokenAtom); // Obtendo o token do átomo
  const navigate = useNavigate()

  const handleCalendarClick = () => {
    navigate('/calendar');
  };

  const handleEventClick = () => {
    navigate('/newevent');
  };

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }} s
    >
      <div className="home-content">
        <motion.h1
          id='test'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className='title-home'
        >
          Bem-vindo à sua Agenda
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Esta é a sua agenda pessoal onde você pode organizar seus eventos e compromissos.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .5, duration: 0.5 }}
        >
          Use a barra de navegação acima para acessar diferentes seções da aplicação.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .7, duration: 0.5 }}
        >
          Se você ainda não se cadastrou, clique no link "Registrar" para criar uma conta.
        </motion.p>
      </div>
      {token && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .9, duration: 0.5 }}
        >
          <button className='btn-event' onClick={handleEventClick}>Ir para criar um novo evento</button>
          <button className='btn-calendar' onClick={handleCalendarClick}>Ir para o Calendário</button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Home;
