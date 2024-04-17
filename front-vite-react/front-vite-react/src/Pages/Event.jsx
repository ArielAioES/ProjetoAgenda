import React, { useState } from 'react';

const Event = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar os dados para o backend ou fazer o que for necessário com eles
        console.log({ title, date, time, duration, description });
    };

    return (
        <div>
            <h2>Cadastro de Eventos</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time">Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="duration">Duration:</label>
                    <input
                        type="time"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default Event;
