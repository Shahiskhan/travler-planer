import React, { useEffect, useState } from 'react';
import { flightService, airlineService } from '../services/resourceService';
import { useAuth } from '../context/AuthContext';
import { Plane, Calendar, Clock, MapPin, Plus, Edit2, Trash2, ArrowRight } from 'lucide-react';
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

    if (loading && flights.length === 0) return <div className="text-center mt-8">Checking flight schedules...</div>;

    return (
        <div className="container">
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>Available Flights</h2>
                <div className="flex-center" style={{ gap: '1rem' }}>
                    {isMiniAdmin && (
                        <button
                            onClick={() => setShowOnlyMine(!showOnlyMine)}
                            className={`btn ${showOnlyMine ? 'btn-primary' : 'btn-outline'}`}
                        >
                            {showOnlyMine ? 'Show All' : 'My Work Only'}
                        </button>
                    )}
                    {isAnyAdmin && (
                        <button onClick={() => handleOpenModal()} className="btn btn-primary flex-center" style={{ gap: '0.5rem' }}>
                            <Plus size={20} /> Add Flight
                        </button>
                    )}
                </div>
            </div>

            <div className="flights-list">
                {flights.map((flight) => (
                    <div key={flight.id} className="glass-panel flight-card animate-slide-in">
                        <div className="flight-main">
                            <div className="airline-info">
                                <div className="airline-icon"><Plane size={24} /></div>
                                <div>
                                    <div className="flight-num">{flight.flightNumber}</div>
                                    <div className="status-badge" data-status={flight.status}>{flight.status}</div>
                                </div>
                            </div>

                            <div className="route-info">
                                <div className="route-point">
                                    <span className="city">{flight.fromCity}</span>
                                    <span className="time">{formatDate(flight.departureTime)}</span>
                                </div>
                                <div className="route-connector">
                                    <div className="duration">{flight.duration}</div>
                                    <div className="line">
                                        <div className="dot"></div>
                                        <Plane size={16} className="plane-icon" />
                                        <div className="dot"></div>
                                    </div>
                                    <div className="class-badge">{flight.class}</div>
                                </div>
                                <div className="route-point text-right">
                                    <span className="city">{flight.toCity}</span>
                                    <span className="time">{formatDate(flight.arrivalTime)}</span>
                                </div>
                            </div>

                            <div className="flight-sidebar">
                                <div className="price">Rs. {flight.price.toLocaleString()}</div>
                                <button className="btn btn-primary btn-sm">Book Now</button>
                                {(isSuperAdmin || (isMiniAdmin && flight.UserId === user.id)) && (
                                    <div className="admin-btns">
                                        <button onClick={() => handleOpenModal(flight)} className="icon-btn edit" title="Edit your work"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(flight.id)} className="icon-btn delete" title="Delete your work"><Trash2 size={16} /></button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {flights.length === 0 && !loading && (
                <div className="glass-panel empty-state">
                    <p>No flights scheduled at the moment.</p>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingFlight ? 'Edit Flight' : 'Add New Flight'}
            >
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-group">
                        <label>Flight Number</label>
                        <input
                            type="text"
                            required
                            className="input"
                            placeholder="e.g. PK-301"
                            value={formData.flightNumber}
                            onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Class</label>
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
                    <div className="form-group">
                        <label>From City</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.fromCity}
                            onChange={(e) => setFormData({ ...formData, fromCity: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>To City</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.toCity}
                            onChange={(e) => setFormData({ ...formData, toCity: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Departure Time</label>
                        <input
                            type="datetime-local"
                            required
                            className="input"
                            value={formData.departureTime}
                            onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Arrival Time</label>
                        <input
                            type="datetime-local"
                            required
                            className="input"
                            value={formData.arrivalTime}
                            onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (e.g. 2h 30m)</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price (PKR)</label>
                        <input
                            type="number"
                            required
                            className="input"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="form-group full-width">
                        <label>Status</label>
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
                    <div className="form-actions full-width">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {editingFlight ? 'Update Flight' : 'Create Flight'}
                        </button>
                    </div>
                </form>
            </Modal>

            <style jsx>{`
                .container { padding: 2rem 0; }
                .flights-list { display: flex; flex-direction: column; gap: 1.5rem; }
                
                .flight-card {
                    padding: 2rem;
                    transition: transform 0.3s ease, border-color 0.3s;
                    border: 1px solid var(--glass-border);
                }
                .flight-card:hover { border-color: var(--primary); transform: translateX(5px); }

                .flight-main {
                    display: grid;
                    grid-template-columns: 200px 1fr 200px;
                    align-items: center;
                    gap: 3rem;
                }

                .airline-info { display: flex; gap: 1rem; align-items: center; }
                .airline-icon {
                    width: 48px;
                    height: 48px;
                    background: rgba(96, 165, 250, 0.1);
                    color: var(--primary);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .flight-num { font-weight: 700; font-size: 1.1rem; }
                .status-badge {
                    font-size: 0.7rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    padding: 0.2rem 0.6rem;
                    border-radius: 4px;
                    margin-top: 0.25rem;
                    display: inline-block;
                }
                .status-badge[data-status="SCHEDULED"] { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
                .status-badge[data-status="ON_TIME"] { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
                .status-badge[data-status="DELAYED"] { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
                .status-badge[data-status="CANCELLED"] { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

                .route-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .route-point { display: flex; flex-direction: column; min-width: 150px; }
                .city { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); }
                .time { font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem; }

                .route-connector {
                    flex: 1;
                    padding: 0 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                }
                .duration { font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
                .line {
                    width: 100%;
                    height: 2px;
                    background: var(--glass-border);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                }
                .dot { width: 6px; height: 6px; background: var(--text-secondary); border-radius: 50%; }
                .plane-icon { color: var(--primary); background: var(--bg-card); padding: 0 10px; z-index: 1; }
                .class-badge {
                    margin-top: 0.5rem;
                    font-size: 0.75rem;
                    background: rgba(255,255,255,0.05);
                    padding: 0.2rem 0.8rem;
                    border-radius: 1rem;
                    color: var(--text-secondary);
                }

                .flight-sidebar {
                    text-align: right;
                    border-left: 1px solid var(--glass-border);
                    padding-left: 2rem;
                }
                .price { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; }
                
                .admin-btns { display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem; }
                .icon-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    border: 1px solid var(--glass-border);
                    background: transparent;
                    color: var(--text-secondary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .icon-btn:hover { border-color: var(--primary); color: var(--primary); background: rgba(96, 165, 250, 0.05); }
                .icon-btn.delete:hover { border-color: var(--danger); color: var(--danger); background: rgba(239, 68, 68, 0.05); }

                @media (max-width: 968px) {
                    .flight-main { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
                    .airline-info { justify-content: center; }
                    .route-info { flex-direction: column; gap: 1.5rem; }
                    .flight-sidebar { border-left: none; border-top: 1px solid var(--glass-border); padding: 1.5rem 0 0; text-align: center; }
                    .admin-btns { justify-content: center; }
                }

                .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
                .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
                .full-width { grid-column: span 2; }
                .form-group label { font-size: 0.85rem; color: var(--text-secondary); }
                .form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
            `}</style>
        </div>
    );
};

export default Flights;
