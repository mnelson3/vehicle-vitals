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
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import DevSeed from './pages/DevSeed';
import AuthAnonButton from './components/AuthAnonButton';
import DevStatusPanel from './components/DevStatusPanel';
import Layout from './components/Layout';
import ComingSoon from './pages/ComingSoon';

function App() {
  const isComingSoonDomain = typeof window !== 'undefined' && ['vehicle-vitals.com', 'www.vehicle-vitals.com'].includes(window.location.hostname);
  return (
    <Router>
      <DevStatusPanel />
      {import.meta.env.DEV && <AuthAnonButton />}
      <Routes>
        {isComingSoonDomain ? (
          <Route element={<Layout forceOverlay />}>
            <Route path="*" element={<ComingSoon />} />
          </Route>
        ) : (
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-vehicle" element={<ProtectedRoute><AddVehicle /></ProtectedRoute>} />
          <Route path="/edit-vehicle/:vin" element={<ProtectedRoute><EditVehicle /></ProtectedRoute>} />
          {import.meta.env.DEV && <Route path="/dev/seed" element={<DevSeed />} />}
        </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
