import logo from './logo.svg';
// import routes from './routes'; // Importing routes from the routes file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home'; // Importing Home component
import './App.css';
import Outcome from './pages/Outcome';

function App() {
  return (
    <div className="App"
      style={{}}> 
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/outcome" element={<Outcome />} /> {/* Outcome route */}
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
