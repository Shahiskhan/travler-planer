import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Locations from './pages/Locations';
import Hotels from './pages/Hotels';
import Flights from './pages/Flights';
import ViewPoints from './pages/ViewPoints';
import Airlines from './pages/Airlines';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--glass-border)',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="locations" element={<Locations />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="flights" element={<Flights />} />
          <Route path="viewpoints" element={<ViewPoints />} />
          <Route path="airlines" element={<Airlines />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
