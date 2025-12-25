import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, Hotel, MapPin, User, LogOut, Mountain, Shield } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: 'Locations', path: '/locations', icon: <MapPin size={18} /> },
        { name: 'Hotels', path: '/hotels', icon: <Hotel size={18} /> },
        { name: 'Flights', path: '/flights', icon: <Plane size={18} /> },
        { name: 'Airlines', path: '/airlines', icon: <Shield size={18} /> },
        { name: 'ViewPoints', path: '/viewpoints', icon: <Mountain size={18} /> },
    ];

    return (
        <nav className="glass-panel" style={{ position: 'sticky', top: '1rem', zIndex: 1000, margin: '1rem', padding: '0.75rem 1.5rem', marginBottom: '2rem' }}>
            <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <Link to="/" className="flex-center" style={{ gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
                    <Plane className="text-primary" style={{ color: 'var(--primary)' }} />
                    <span style={{ background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                        TravelSys
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex-center" style={{ gap: '1.5rem', flexWrap: 'wrap' }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="flex-center"
                            style={{
                                gap: '0.25rem',
                                color: isActive(link.path) ? 'var(--primary)' : 'var(--text-secondary)',
                                fontWeight: isActive(link.path) ? '600' : '400',
                                transition: 'color 0.3s'
                            }}
                        >
                            {link.icon} {link.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="flex-center" style={{ gap: '1rem' }}>
                    {user ? (
                        <>
                            <div className="flex-center" style={{ gap: '0.5rem' }}>
                                <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden md:block">{user.name}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="btn-outline"
                                style={{
                                    padding: '0.5rem 0.75rem',
                                    fontSize: '0.875rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}
                            >
                                <LogOut size={16} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-outline" style={{ padding: '0.5rem 1rem' }}>Login</Link>
                            <Link to="/register" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

const MainLayout = () => {
    return (
        <div style={{ paddingBottom: '2rem' }}>
            <Navbar />
            <main className="container page-transition">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
