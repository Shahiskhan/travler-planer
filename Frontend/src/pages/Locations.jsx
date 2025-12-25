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

    if (loading && locations.length === 0) return <div className="text-center mt-8 text-text-secondary">Loading amazing places...</div>;

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h2 className="text-4xl font-bold text-white">Discover Pakistan</h2>
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
                            <Plus size={20} /> Add Location
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {locations.map((loc) => (
                    <div key={loc.id} className="glass-panel overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                        <div className="relative h-64 bg-card">
                            {loc.thumbnail ? (
                                <img src={loc.thumbnail} alt={loc.cityName} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-text-secondary">
                                    <Camera size={48} />
                                </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-between">
                                <h3 className="text-2xl font-bold text-white mb-0">{loc.cityName}, {loc.country}</h3>
                                {(isSuperAdmin || (isMiniAdmin && loc.UserId === user.id)) && (
                                    <div className="flex gap-2">
                                        <button onClick={() => handleOpenModal(loc)} className="p-2 rounded-full bg-primary/20 hover:bg-primary text-white backdrop-blur-sm transition-colors block" title="Edit">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(loc.id)} className="p-2 rounded-full bg-red-500/20 hover:bg-red-500 text-white backdrop-blur-sm transition-colors block" title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                                {loc.description}
                            </p>
                            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                                <span className="flex items-center gap-2 text-sm text-text-secondary">
                                    <Calendar size={16} className="text-primary" /> Best time: {loc.bestTimeToVisit}
                                </span>
                                <span className="flex items-center gap-2 text-sm text-text-secondary">
                                    <MapPin size={16} className="text-primary" /> {loc.coordinates || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {locations.length === 0 && !loading && (
                <div className="glass-panel p-16 text-center text-text-secondary">
                    <p className="text-xl">No locations found. Start adding some!</p>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingLoc ? 'Edit Location' : 'Add New Location'}
            >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">City Name</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.cityName}
                            onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Country</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-text-secondary">Thumbnail URL</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.thumbnail}
                            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-text-secondary">Description</label>
                        <textarea
                            rows="4"
                            className="input"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Best Time to Visit</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.bestTimeToVisit}
                            onChange={(e) => setFormData({ ...formData, bestTimeToVisit: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Coordinates (Lat, Long)</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.coordinates}
                            onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {editingLoc ? 'Update Location' : 'Create Location'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Locations;
