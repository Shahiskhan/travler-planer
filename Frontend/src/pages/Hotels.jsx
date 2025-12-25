import React, { useEffect, useState } from 'react';
import { hotelService } from '../services/resourceService';
import { Star, MapPin, Phone } from 'lucide-react';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const data = await hotelService.getAll();
                setHotels(Array.isArray(data) ? data : data.hotels || []);
            } catch (error) {
                console.error("Failed to fetch hotels");
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    if (loading) return <div className="text-center mt-8">Loading luxury stays...</div>;

    return (
        <div>
            <h2 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>Luxury Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="glass-panel card" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '200px', background: '#334155', position: 'relative' }}>
                            {hotel.image ? (
                                <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div className="flex-center" style={{ height: '100%', color: 'var(--text-secondary)' }}>No Image</div>
                            )}
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <div className="flex-between" style={{ marginBottom: '1rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{hotel.name}</h3>
                                <div className="flex-center" style={{ gap: '0.25rem', color: '#fbbf24' }}>
                                    <Star fill="#fbbf24" size={18} />
                                    <span>{hotel.rating}</span>
                                </div>
                            </div>
                            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                <MapPin size={16} />
                                <span>{hotel.address}</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{hotel.description}</p>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                {hotel.amenities && hotel.amenities.split(',').map(am => (
                                    <span key={am} style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                                        {am.trim()}
                                    </span>
                                ))}
                            </div>

                            <div className="flex-between" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                                <div>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>PKR {hotel.pricePerNight}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}> / night</span>
                                </div>
                                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Book Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {hotels.length === 0 && (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>No hotels found yet.</p>
                </div>
            )}
        </div>
    );
};

export default Hotels;
