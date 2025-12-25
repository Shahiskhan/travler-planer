import React, { useEffect, useState } from 'react';
import { locationService } from '../services/resourceService';
import { MapPin, Calendar } from 'lucide-react';

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await locationService.getAll();
                // Handle if data is wrapped or array
                setLocations(Array.isArray(data) ? data : data.locations || []);
            } catch (error) {
                console.error("Failed to fetch locations", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);

    if (loading) return <div className="text-center mt-8">Loading amazing places...</div>;

    return (
        <div>
            <h2 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>Popular Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {locations.map((loc) => (
                    <div key={loc.id} className="glass-panel card" style={{ overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '200px', background: '#334155', position: 'relative' }}>
                            {loc.thumbnail ? (
                                <img src={loc.thumbnail} alt={loc.cityName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div className="flex-center" style={{ height: '100%', color: 'var(--text-secondary)' }}>No Image</div>
                            )}
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>{loc.cityName}, {loc.country}</h3>
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.6', flex: 1 }}>
                                {loc.description}
                            </p>
                            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--accent)' }}>
                                <Calendar size={16} />
                                <span style={{ fontSize: '0.875rem' }}>Best time: {loc.bestTimeToVisit}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {locations.length === 0 && (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>No locations found yet.</p>
                </div>
            )}
        </div>
    );
};

export default Locations;
