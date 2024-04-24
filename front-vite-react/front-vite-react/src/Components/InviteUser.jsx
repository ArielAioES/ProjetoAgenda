import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { HOST_URL } from './config';
import { tokenAtom } from '../Components/atoms/atoms';

import '../Components/Css/InviteUser.css';

const EmailForm = ({ onClose }) => {
  const { id } = useParams();
  const [token] = useAtom(tokenAtom);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showOverlay, setShowOverlay] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowOverlay(false);
    onClose();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateParams = {
        to_email: email,
        event_link: `${HOST_URL}/events/join/${id}`,
      };

      await emailjs.send('service_coeecjh', 'template_8m5wyws', templateParams, 'qIhvbaLRmzK3O4hcm');

      setMessage('Convite enviado com sucesso!');
      setEmail('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <div className={`EmailForm ${showOverlay ? 'show' : ''}`}>
      <div className="modal">
        <h2 className='send-invite'>Enviar Convite</h2>
        <button className="close-button" onClick={handleClose}>Fechar</button>
        <form onSubmit={handleSubmit} className='form-invite'>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
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