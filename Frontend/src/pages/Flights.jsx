import React, { useEffect, useState } from 'react';
import { flightService } from '../services/resourceService';
import { Plane } from 'lucide-react';

const Flights = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const data = await flightService.getAll();
                setFlights(Array.isArray(data) ? data : data.flights || []);
            } catch (error) {
                console.error("Failed to fetch flights");
            } finally {
                setLoading(false);
            }
        };
        fetchFlights();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) return <div className="text-center mt-8">Loading available flights...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>Find Your Flight</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {flights.map((flight) => (
                    <div key={flight.id} className="glass-panel card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, minWidth: '300px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>{formatDate(flight.departureTime)}</span>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{flight.fromCity}</span>
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{flight.duration}</span>
                                <div style={{ width: '100%', height: '1px', background: 'var(--text-secondary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {/* Plane icon moving right */}
                                    <Plane size={16} style={{ transform: 'rotate(90deg)', background: 'var(--bg-card)', padding: '0', color: 'var(--primary)', position: 'absolute' }} />
                                </div>
                                <span style={{ color: 'var(--primary)', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: '600' }}>{flight.flightNumber}</span>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>{formatDate(flight.arrivalTime)}</span>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{flight.toCity}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', minWidth: '150px' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>PKR {flight.price}</span>
                            <span style={{
                                background: flight.class === 'BUSINESS' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                color: flight.class === 'BUSINESS' ? '#a78bfa' : '#60a5fa',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '600'
                            }}>
                                {flight.class}
                            </span>
                            <button className="btn btn-primary" style={{ padding: '0.4rem 1.25rem', width: '100%' }}>Select</button>
                        </div>
                    </div>
                ))}
            </div>
            {flights.length === 0 && (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>No scheduled flights found.</p>
                </div>
            )}
        </div>
    );
};

export default Flights;
