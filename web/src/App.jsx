// File: web/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddVehicle from './pages/AddVehicle';
import EditVehicle from './pages/EditVehicle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/edit-vehicle/:vin" element={<EditVehicle />} />
      </Routes>
    </Router>
  );
}

export default App;
