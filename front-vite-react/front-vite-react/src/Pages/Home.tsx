import React from 'react';
import {Menubar} from 'primereact/menubar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home () {

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
    <div className="title">
        <Menubar model={menuitems} />
      <header/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
    )
}

export default Home;