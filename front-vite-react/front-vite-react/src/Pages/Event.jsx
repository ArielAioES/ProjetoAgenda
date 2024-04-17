import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importe useNavigate para a navegação

const Event = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); // Use useNavigate para a navegação

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar os dados para o backend ou fazer o que for necessário com eles
        console.log({ title, date, time, duration, description });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []);

    return (
        <motion.div
            className="event-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form onSubmit={handleSubmit}>
                <motion.h2
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Cadastro de Eventos
                </motion.h2>
                <div>
                    <motion.label
                        htmlFor="title"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Title:
                    </motion.label>
                    <motion.input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        required
                    />
                </div>
                <div>
                    <motion.label
                        htmlFor="date"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        Date:
                    </motion.label>
                    <motion.input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                        required
                    />
                </div>
                <div>
                    <motion.label
                        htmlFor="time"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        Time:
                    </motion.label>
                    <motion.input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        required
                    />
                </div>
                <div>
                    <motion.label
                        htmlFor="duration"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.6 }}
                    >
                        Duration:
                    </motion.label>
                    <motion.input
                        type="time"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.8 }}
                        required
                    />
                </div>
                <div>
                    <motion.label
                        htmlFor="description"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 2 }}
                    >
                        Description:
                    </motion.label>
                    <motion.textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 2.2 }}
                        required
                    />
                </div>
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.4 }}
                >
                    Salvar
                </motion.button>
            </form>
        </motion.div>
    );
};

export default Event;