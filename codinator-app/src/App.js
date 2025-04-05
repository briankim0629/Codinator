import logo from './logo.svg';
// import routes from './routes'; // Importing routes from the routes file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home'; // Importing Home component
import './App.css';

function App() {
  return (
    <div className="App"
      style={{}}> 
      <Home /> {/* Render the Home component directly */}
    </div>
  );
}

export default App;
