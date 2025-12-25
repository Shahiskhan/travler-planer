import React, { useEffect, useState } from 'react';
import { locationService } from '../services/resourceService';
import { useAuth } from '../context/AuthContext';
import { MapPin, Calendar, Plus, Edit2, Trash2, Camera } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Modal from '../components/Modal';

const Locations = () => {
    const { user } = useAuth();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showOnlyMine, setShowOnlyMine] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLoc, setEditingLoc] = useState(null);
    const [formData, setFormData] = useState({
        cityName: '',
        country: 'Pakistan',
        description: '',
        bestTimeToVisit: '',
        coordinates: '',
        thumbnail: ''
    });

    const isSuperAdmin = user?.role === 'ADMIN';
    const isMiniAdmin = user?.role === 'MINI_ADMIN';
    const isAnyAdmin = isSuperAdmin || isMiniAdmin;

    const fetchLocations = async () => {
        try {
            setLoading(true);
            const data = await locationService.getAll(showOnlyMine ? user.id : null);
            setLocations(Array.isArray(data) ? data : data.locations || []);
        } catch (error) {
            toast.error("Failed to fetch locations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, [showOnlyMine]);

    const handleOpenModal = (loc = null) => {
        if (loc) {
            setEditingLoc(loc);
            setFormData({
                cityName: loc.cityName,
                country: loc.country,
                description: loc.description,
                bestTimeToVisit: loc.bestTimeToVisit,
                coordinates: loc.coordinates,
                thumbnail: loc.thumbnail
            });
        } else {
            setEditingLoc(null);
            setFormData({
                cityName: '',
                country: 'Pakistan',
                description: '',
                bestTimeToVisit: '',
                coordinates: '',
                thumbnail: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingLoc) {
                await locationService.update(editingLoc.id, formData);
                toast.success('Location updated successfully');
            } else {
                await locationService.create(formData);
                toast.success('Location created successfully');
            }
            setIsModalOpen(false);
            fetchLocations();
        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this location?')) {
            try {
                await locationService.delete(id);
                toast.success('Location deleted successfully');
                fetchLocations();
            } catch (error) {
                toast.error("Failed to delete location");
            }
        }
    };

    if (loading && locations.length === 0) return <div className="text-center mt-8">Loading amazing places...</div>;

    return (
        <div className="container">
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>Discover Pakistan</h2>
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
                            <Plus size={20} /> Add Location
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {locations.map((loc) => (
                    <div key={loc.id} className="glass-panel card location-card" style={{ padding: 0 }}>
                        <div className="card-image-wrapper">
                            {loc.thumbnail ? (
                                <img src={loc.thumbnail} alt={loc.cityName} className="card-img" />
                            ) : (
                                <div className="flex-center placeholder-img">
                                    <Camera size={48} />
                                </div>
                            )}
                            <div className="card-overlay">
                                <h3 className="card-title">{loc.cityName}, {loc.country}</h3>
                                {(isSuperAdmin || (isMiniAdmin && loc.UserId === user.id)) && (
                                    <div className="admin-actions">
                                        <button onClick={() => handleOpenModal(loc)} className="action-btn edit" title="Edit your work"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(loc.id)} className="action-btn delete" title="Delete your work"><Trash2 size={16} /></button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="card-desc">{loc.description}</p>
                            <div className="card-info">
                                <span className="flex-center info-item">
                                    <Calendar size={16} /> Best time: {loc.bestTimeToVisit}
                                </span>
                                <span className="flex-center info-item">
                                    <MapPin size={16} /> {loc.coordinates || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {locations.length === 0 && !loading && (
                <div className="glass-panel empty-state">
                    <p>No locations found. Start adding some!</p>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingLoc ? 'Edit Location' : 'Add New Location'}
            >
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-group">
                        <label>City Name</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.cityName}
                            onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        />
                    </div>
                    <div className="form-group full-width">
                        <label>Thumbnail URL</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.thumbnail}
                            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                        />
                    </div>
                    <div className="form-group full-width">
                        <label>Description</label>
                        <textarea
                            rows="4"
                            className="input"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Best Time to Visit</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.bestTimeToVisit}
                            onChange={(e) => setFormData({ ...formData, bestTimeToVisit: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Coordinates (Lat, Long)</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.coordinates}
                            onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                        />
                    </div>
                    <div className="form-actions full-width">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {editingLoc ? 'Update Location' : 'Create Location'}
                        </button>
                    </div>
                </form>
            </Modal>

            <style jsx>{`
                .container { padding: 2rem 0; }
                
                .location-card {
                    overflow: hidden;
                    transition: transform 0.3s ease;
                }
                
                .location-card:hover {  transform: translateY(-5px); }

                .card-image-wrapper {
                    height: 250px;
                    position: relative;
                    background: #1e293b;
                }

                .card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .placeholder-img {
                    height: 100%;
                    color: var(--text-secondary);
                }

                .card-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 1.5rem;
                    background: linear-gradient(transparent, rgba(0,0,0,0.9));
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }

                .card-title {
                    margin: 0;
                    color: white;
                    font-size: 1.5rem;
                }

                .admin-actions {
                    display: flex;
                    gap: 0.5rem;
                }

                .action-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    backdrop-filter: blur(5px);
                }

                .action-btn.edit { background: rgba(59, 130, 246, 0.5); color: white; }
                .action-btn.delete { background: rgba(239, 68, 68, 0.5); color: white; }
                
                .action-btn:hover { transform: scale(1.1); }

                .card-body { padding: 1.5rem; }
                
                .card-desc {
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .card-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    border-top: 1px solid var(--glass-border);
                    padding-top: 1rem;
                }

                .info-item {
                    justify-content: flex-start;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                }

                .empty-state {
                    padding: 4rem;
                    text-align: center;
                    color: var(--text-secondary);
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }

                .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
                .full-width { grid-column: span 2; }
                
                .form-group label { font-size: 0.875rem; color: var(--text-secondary); }
                
                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 1rem;
                }
            `}</style>
        </div>
    );
};

export default Locations;
