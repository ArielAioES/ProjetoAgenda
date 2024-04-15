
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import './App.css';
import {Menubar} from 'primereact/menubar';

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate(); 

  const menuitems = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => navigate('/') 
    },
    {
      label: 'Login',
      icon: 'pi pi-fw pi-user',
      command: () => navigate('/login')
    },
  ];

  return (
    <>
      <div className="App">
        <Menubar model={menuitems} />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
