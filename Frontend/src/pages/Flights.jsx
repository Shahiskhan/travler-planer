import React, { useEffect, useState } from 'react';
import { flightService, airlineService } from '../services/resourceService';
import { useAuth } from '../context/AuthContext';
import { Plane, Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Modal from '../components/Modal';

const Flights = () => {
    const { user } = useAuth();
    const [flights, setFlights] = useState([]);
    const [airlines, setAirlines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showOnlyMine, setShowOnlyMine] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFlight, setEditingFlight] = useState(null);
    const [formData, setFormData] = useState({
        flightNumber: '',
        fromCity: '',
        toCity: '',
        departureTime: '',
        arrivalTime: '',
        duration: '',
        price: 0,
        class: 'ECONOMY',
        status: 'SCHEDULED'
    });

    const isSuperAdmin = user?.role === 'ADMIN';
    const isMiniAdmin = user?.role === 'MINI_ADMIN';
    const isAnyAdmin = isSuperAdmin || isMiniAdmin;

    const fetchData = async () => {
        try {
            setLoading(true);
            const [flightsData, airlinesData] = await Promise.all([
                flightService.getAll(showOnlyMine ? user.id : null),
                airlineService.getAll()
            ]);
            setFlights(Array.isArray(flightsData) ? flightsData : flightsData.flights || []);
            setAirlines(Array.isArray(airlinesData) ? airlinesData : airlinesData.airlines || []);
        } catch (error) {
            toast.error("Failed to fetch flight data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [showOnlyMine]);

    const handleOpenModal = (flight = null) => {
        if (flight) {
            setEditingFlight(flight);
            // Format dates for input type="datetime-local"
            const depDate = new Date(flight.departureTime).toISOString().slice(0, 16);
            const arrDate = new Date(flight.arrivalTime).toISOString().slice(0, 16);
            setFormData({
                flightNumber: flight.flightNumber,
                fromCity: flight.fromCity,
                toCity: flight.toCity,
                departureTime: depDate,
                arrivalTime: arrDate,
                duration: flight.duration,
                price: flight.price,
                class: flight.class,
                status: flight.status
            });
        } else {
            setEditingFlight(null);
            setFormData({
                flightNumber: '',
                fromCity: '',
                toCity: '',
                departureTime: '',
                arrivalTime: '',
                duration: '',
                price: 0,
                class: 'ECONOMY',
                status: 'SCHEDULED'
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingFlight) {
                await flightService.update(editingFlight.id, formData);
                toast.success('Flight updated successfully');
            } else {
                await flightService.create(formData);
                toast.success('Flight created successfully');
            }
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this flight?')) {
            try {
                await flightService.delete(id);
                toast.success('Flight deleted successfully');
                fetchData();
            } catch (error) {
                toast.error("Failed to delete flight");
            }
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'ON_TIME': return 'bg-green-500/10 text-green-500';
            case 'DELAYED': return 'bg-yellow-500/10 text-yellow-500';
            case 'CANCELLED': return 'bg-red-500/10 text-red-500';
            default: return 'bg-blue-500/10 text-blue-500';
        }
    };

    if (loading && flights.length === 0) return <div className="text-center mt-8 text-text-secondary">Checking flight schedules...</div>;

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h2 className="text-4xl font-bold text-white">Available Flights</h2>
                <div className="flex items-center gap-4">
                    {isMiniAdmin && (
                        <button
                            onClick={() => setShowOnlyMine(!showOnlyMine)}
                            className={`btn ${showOnlyMine ? 'btn-primary' : 'btn-outline'}`}
                        >
                            {showOnlyMine ? 'Show All' : 'My Work Only'}
                        </button>
                    )}
                    {isAnyAdmin && (
                        <button onClick={() => handleOpenModal()} className="btn btn-primary flex items-center gap-2">
                            <Plus size={20} /> Add Flight
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {flights.map((flight) => (
                    <div key={flight.id} className="glass-panel p-8 hover:border-primary transition-all duration-300 border border-white/10 animate-slide-up">
                        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-8 items-center text-center lg:text-left">
                            <div className="flex flex-col lg:flex-row gap-4 items-center justify-center lg:justify-start">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                    <Plane size={24} />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">{flight.flightNumber}</div>
                                    <div className={`text-xs font-bold uppercase px-2.5 py-1 rounded-md mt-1 inline-block ${getStatusColor(flight.status)}`}>
                                        {flight.status.replace('_', ' ')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-0 lg:px-8">
                                <div className="flex flex-col min-w-[150px] text-center md:text-left">
                                    <span className="text-2xl font-bold text-white">{flight.fromCity}</span>
                                    <span className="text-sm text-text-secondary mt-1">{formatDate(flight.departureTime)}</span>
                                </div>
                                <div className="flex-1 w-full flex flex-col items-center px-4 relative">
                                    <div className="text-xs text-text-secondary mb-2">{flight.duration}</div>
                                    <div className="w-full h-0.5 bg-white/10 flex items-center justify-between relative">
                                        <div className="w-1.5 h-1.5 bg-text-secondary rounded-full"></div>
                                        <Plane size={16} className="text-primary bg-card px-1 z-10" />
                                        <div className="w-1.5 h-1.5 bg-text-secondary rounded-full"></div>
                                    </div>
                                    <div className="mt-2 bg-white/5 px-3 py-1 rounded-full text-xs text-text-secondary">
                                        {flight.class}
                                    </div>
                                </div>
                                <div className="flex flex-col min-w-[150px] text-center md:text-right">
                                    <span className="text-2xl font-bold text-white">{flight.toCity}</span>
                                    <span className="text-sm text-text-secondary mt-1">{formatDate(flight.arrivalTime)}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center lg:items-end gap-4 lg:border-l border-white/10 lg:pl-8">
                                <div className="text-2xl font-bold text-primary">Rs. {flight.price.toLocaleString()}</div>
                                <button className="btn btn-primary w-full lg:w-auto text-sm py-2">Book Now</button>
                                {(isSuperAdmin || (isMiniAdmin && flight.UserId === user.id)) && (
                                    <div className="flex gap-2 justify-end mt-2">
                                        <button onClick={() => handleOpenModal(flight)} className="p-2 rounded-lg border border-white/10 text-text-secondary hover:bg-white/5 hover:text-primary transition-colors" title="Edit">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(flight.id)} className="p-2 rounded-lg border border-white/10 text-text-secondary hover:bg-white/5 hover:text-red-500 transition-colors" title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {flights.length === 0 && !loading && (
                <div className="glass-panel p-16 text-center text-text-secondary">
                    <p className="text-xl">No flights scheduled at the moment.</p>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingFlight ? 'Edit Flight' : 'Add New Flight'}
            >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Flight Number</label>
                        <input
                            type="text"
                            required
                            className="input"
                            placeholder="e.g. PK-301"
                            value={formData.flightNumber}
                            onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Class</label>
                        <select
                            className="input"
                            value={formData.class}
                            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                        >
                            <option value="ECONOMY">Economy</option>
                            <option value="BUSINESS">Business</option>
                            <option value="FIRST">First Class</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">From City</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.fromCity}
                            onChange={(e) => setFormData({ ...formData, fromCity: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">To City</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.toCity}
                            onChange={(e) => setFormData({ ...formData, toCity: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Departure Time</label>
                        <input
                            type="datetime-local"
                            required
                            className="input"
                            value={formData.departureTime}
                            onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Arrival Time</label>
                        <input
                            type="datetime-local"
                            required
                            className="input"
                            value={formData.arrivalTime}
                            onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Duration (e.g. 2h 30m)</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Price (PKR)</label>
                        <input
                            type="number"
                            required
                            className="input"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm text-text-secondary">Status</label>
                        <select
                            className="input"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="SCHEDULED">Scheduled</option>
                            <option value="ON_TIME">On Time</option>
                            <option value="DELAYED">Delayed</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {editingFlight ? 'Update Flight' : 'Create Flight'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Flights;
