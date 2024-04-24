import React, { useState } from 'react';
import { API_URL } from './config';
import { Resend } from 'resend';

const EmailForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [event_id, setEventId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showOverlay, setShowOverlay] = useState(true);

  const handleClose = () => {
    setShowOverlay(false);
    onClose();
  };

  const resend = new Resend('re_EcZzsvEU_QTFuPXHqPGDLQCHQsgv3x9KF');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEventIdChange = (e) => {
    setEventId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const eventResponse = await fetch(`${API_URL}/api/${event_id}/getEventDetails`, {
        method: 'GET',
      });

      if (!eventResponse.ok) {
        throw new Error('Failed to fetch event details');
      }

      const eventData = await eventResponse.json();
      
      // Send the user's invitation to the backend
      const inviteResponse = await fetch(`${API_URL}/api/${event_id}/inviteUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, eventData }),
      });

      if (!inviteResponse.ok) {
        throw new Error('Failed to send invitation');
      }

      const inviteData = await inviteResponse.json();
      setMessage(inviteData.message);
      setEmail('');
      setEventId('');

      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email, 
        subject: 'Convite para o evento',
        html: `<p>Participe do meu evento. Clique <a href="${API_URL}/login?eventId=${event_id}">aqui</a> para fazer login e acessar o evento</p>`, 
      });


    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={`EmailForm ${showOverlay ? 'show' : ''}`}>
      <div className="modal">
      <h2>Enviar Convite</h2>
      <button className="close-button" onClick={handleClose}>Fechar</button>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          ID do Evento:
          <input type="text" value={event_id} onChange={handleEventIdChange} />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Convite'}
        </button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>Erro: {error}</p>}
    </div>
    </div>
  );
};

export default EmailForm;
