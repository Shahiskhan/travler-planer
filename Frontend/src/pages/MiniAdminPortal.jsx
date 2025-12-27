import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    MapPin, Hotel, Plane, Eye, Building2,
    BarChart3, LogOut, Briefcase, CheckCircle, Clock, Home, Menu, X
} from 'lucide-react';

// Import existing pages directly
import Locations from './Locations';
import Hotels from './Hotels';
import Flights from './Flights';
import ViewPoints from './ViewPoints';
import Airlines from './Airlines';

const MiniAdminPortal = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Redirect if not mini admin
    useEffect(() => {
        if (user && user.role !== 'MINI_ADMIN') {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { id: 'dashboard', label: 'My Dashboard', icon: BarChart3 },
        { id: 'locations', label: 'My Locations', icon: MapPin },
        { id: 'hotels', label: 'My Hotels', icon: Hotel },
        { id: 'flights', label: 'My Flights', icon: Plane },
        { id: 'viewpoints', label: 'My View Points', icon: Eye },
        { id: 'airlines', label: 'My Airlines', icon: Building2 },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    My Work Dashboard
                                </h1>
                                <p className="text-text-secondary mt-2">Welcome back, {user?.name}! Manage your content here.</p>
                            </div>
                            <button
                                onClick={() => navigate('/')}
                                className="btn btn-outline flex items-center gap-2"
                            >
                                <Home size={18} />
                                View Site
                            </button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="glass-panel p-6 hover-lift cursor-pointer" onClick={() => setActiveTab('locations')}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-blue-500/10">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <p className="text-text-secondary text-sm mb-1">My Locations</p>
                                <p className="text-3xl font-bold">--</p>
                            </div>

                            <div className="glass-panel p-6 hover-lift cursor-pointer" onClick={() => setActiveTab('hotels')}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-purple-500/10">
                                        <Hotel className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <p className="text-text-secondary text-sm mb-1">My Hotels</p>
                                <p className="text-3xl font-bold">--</p>
                            </div>

                            <div className="glass-panel p-6 hover-lift cursor-pointer" onClick={() => setActiveTab('flights')}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-green-500/10">
                                        <Plane className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <p className="text-text-secondary text-sm mb-1">My Flights</p>
                                <p className="text-3xl font-bold">--</p>
                            </div>

                            <div className="glass-panel p-6 hover-lift cursor-pointer" onClick={() => setActiveTab('airlines')}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-orange-500/10">
                                        <Building2 className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <p className="text-text-secondary text-sm mb-1">My Airlines</p>
                                <p className="text-3xl font-bold">--</p>
                            </div>
                        </div>

                        {/* Info Banner */}
                        <div className="glass-panel p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
                            <div className="flex items-start gap-4">
                                <Briefcase className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Mini Admin Access</h3>
                                    <p className="text-text-secondary">
                                        You have access to manage your own content. All sections show only items created by you.
                                        You can create, edit, and delete your own entries.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Access */}
                        <div className="glass-panel p-6">
                            <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {menuItems.filter(item => item.id !== 'dashboard').map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className="btn btn-secondary flex flex-col items-center gap-3 py-6 hover-lift"
                                    >
                                        <item.icon className="w-8 h-8" />
                                        <span className="font-medium text-sm">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* My Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="glass-panel p-6">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                    Recent Updates
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4 p-3 rounded-lg bg-bg-secondary/30">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="font-medium">Updated hotel listing</p>
                                            <p className="text-sm text-text-secondary">2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 rounded-lg bg-bg-secondary/30">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="font-medium">Added new location</p>
                                            <p className="text-sm text-text-secondary">5 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel p-6">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Clock className="w-6 h-6 text-orange-500" />
                                    Pending Tasks
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4 p-3 rounded-lg bg-bg-secondary/30">
                                        <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="font-medium">Review flight details</p>
                                            <p className="text-sm text-text-secondary">Due today</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'locations':
                return <Locations />;
            case 'hotels':
                return <Hotels />;
            case 'flights':
                return <Flights />;
            case 'viewpoints':
                return <ViewPoints />;
            case 'airlines':
                return <Airlines />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-bg-primary flex">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-bg-card border-r border-glass-border flex flex-col transition-all duration-300 fixed h-full z-50`}>
                <div className="p-6 border-b border-glass-border flex items-center justify-between">
                    {sidebarOpen && (
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Mini Admin
                            </h2>
                            <p className="text-xs text-text-secondary mt-1 truncate">{user?.email}</p>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id
                                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                                    : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                                }`}
                            title={!sidebarOpen ? item.label : ''}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {sidebarOpen && <span className="font-medium">{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-glass-border">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-all"
                        title={!sidebarOpen ? 'Logout' : ''}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
                <div className="p-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default MiniAdminPortal;
