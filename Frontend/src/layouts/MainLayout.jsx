import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, Hotel, MapPin, LogOut, Mountain, Shield } from 'lucide-react';

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
        <nav className="sticky top-4 z-50 mx-4 mb-8 px-6 py-3 glass-panel">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                    <Plane className="text-primary" />
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        TravelSys
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex flex-wrap items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-1 transition-colors duration-300 ${isActive(link.path)
                                    ? 'text-primary font-semibold'
                                    : 'text-text-secondary font-normal hover:text-primary'
                                }`}
                        >
                            {link.icon} {link.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-white">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden md:block font-medium">{user.name}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="btn-outline px-3 py-2 text-sm flex items-center gap-1"
                            >
                                <LogOut size={16} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-outline px-4 py-2 text-sm">Login</Link>
                            <Link to="/register" className="btn-primary px-4 py-2 text-sm text-white">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

const MainLayout = () => {
    return (
        <div className="pb-8">
            <Navbar />
            <main className="container mx-auto px-4 page-transition">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
