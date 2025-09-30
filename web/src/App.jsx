// File: web/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Instructions from './pages/Instructions';
import Login from './pages/Login';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import AddVehicle from './pages/AddVehicle';
import EditVehicle from './pages/EditVehicle';
import DevSeed from './pages/DevSeed';
import AuthAnonButton from './components/AuthAnonButton';
import DevStatusPanel from './components/DevStatusPanel';

function App() {
  return (
    <Router>
      <DevStatusPanel />
      <AuthAnonButton />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Home />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/edit-vehicle/:vin" element={<EditVehicle />} />
        {import.meta.env.DEV && <Route path="/dev/seed" element={<DevSeed />} />}
      </Routes>
    </Router>
  );
}

export default App;
