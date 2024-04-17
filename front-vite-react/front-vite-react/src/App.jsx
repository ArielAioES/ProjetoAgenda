import { Outlet } from 'react-router-dom';
import Navbar from '../src/Components/Navbar.jsx';

import './App.css';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
