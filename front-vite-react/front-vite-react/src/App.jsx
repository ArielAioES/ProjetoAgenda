
import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import './App.css';
import Routes from '../src/Components/Content.jsx'


function App() {

  return (
    <>
      <div className="App">
        <Routes />
        <Outlet />
      </div>
    </>
  );
}

export default App;
