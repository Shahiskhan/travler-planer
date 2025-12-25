import React, { useEffect, useState } from 'react';
import { viewpointService } from '../services/resourceService';
import { MapPin, Clock } from 'lucide-react';

const ViewPoints = () => {
    const [viewpoints, setViewpoints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchViewPoints = async () => {
            try {
                const data = await viewpointService.getAll();
                setViewpoints(Array.isArray(data) ? data : data.viewpoints || []);
            } catch (error) {
                console.error("Failed to fetch viewpoints");
            } finally {
                setLoading(false);
            }
        };
        fetchViewPoints();
    }, []);

    if (loading) return <div className="text-center mt-8">Loading scenic spots...</div>;

    return (
        <div>
            <h2 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>Must-Visit Viewpoints</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {viewpoints.map((vp) => (
                    <div key={vp.id} className="glass-panel card" style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ height: '250px', background: '#334155', position: 'relative' }}>
                            {vp.bannerImage ? (
                                <img src={vp.bannerImage} alt={vp.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div className="flex-center" style={{ height: '100%', color: 'var(--text-secondary)' }}>No Banner Image</div>
                            )}
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.25rem 0.75rem', borderRadius: '20px', color: 'white', fontSize: '0.9rem' }}>
                                {vp.entryFee === 0 || vp.entryFee === "0" ? 'Free Entry' : `PKR ${vp.entryFee}`}
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.75rem', margin: '0 0 1rem 0' }}>{vp.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                {vp.description}
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                    <Clock size={16} className="text-primary" style={{ color: 'var(--primary)' }} />
                                    <span>{vp.openingHours}</span>
                                </div>
                                {vp.Location && (
                                    <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                        <MapPin size={16} className="text-primary" style={{ color: 'var(--primary)' }} />
                                        <span>{vp.Location.cityName}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {viewpoints.length === 0 && (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>No viewpoints found yet.</p>
                </div>
            )}
        </div>
    );
};

export default ViewPoints;
