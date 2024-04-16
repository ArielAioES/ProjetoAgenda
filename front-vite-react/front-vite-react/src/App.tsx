
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import './App.css';
import Routes from '../src/Components/Content.tsx'


function App() {

  return (
    <>
      <div className="App">
        <Routes />
      </div>
    </>
  );
}

export default App;
