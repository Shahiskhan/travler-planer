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
import SuperAdminPortal from './pages/SuperAdminPortal';
import MiniAdminPortal from './pages/MiniAdminPortal';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
            },
          }}
        />
        <Routes>
          {/* Admin Portals - Outside MainLayout */}
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                <SuperAdminPortal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mini-admin"
            element={
              <ProtectedRoute allowedRoles={['MINI_ADMIN']}>
                <MiniAdminPortal />
              </ProtectedRoute>
            }
          />

          {/* Main Application Routes */}
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
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
