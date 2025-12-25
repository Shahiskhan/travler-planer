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
          <Route index element={
            <div className="text-center mt-8" style={{ padding: '4rem 1rem' }}>
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                background: 'linear-gradient(to right, #60a5fa, #c084fc, #f472b6)',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                Explore the World
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: 'var(--text-secondary)',
                maxWidth: '700px',
                margin: '0 auto 3rem',
                lineHeight: '1.6'
              }}>
                Discover breath-taking locations, book luxury hotels, and find the best flights. Your next adventure starts here.
              </p>
              <div className="flex-center" style={{ gap: '1.5rem' }}>
                <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Start Exploring</button>
                <button className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>View Deals</button>
              </div>
            </div>
          } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="locations" element={<Locations />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="flights" element={<Flights />} />
          <Route path="viewpoints" element={<ViewPoints />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
