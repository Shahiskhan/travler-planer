import React, { useEffect, useState } from 'react';
import { locationService } from '../../services/resourceService';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Calendar, Plus, Edit2, Trash2, Camera, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Modal from '../Modal';

const LocationsManagement = ({ miniAdmin = false }) => {
    const { user } = useAuth();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
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

    const isSuperAdmin = user?.role === 'SUPER_ADMIN';
    const isMiniAdmin = user?.role === 'MINI_ADMIN';

    const fetchLocations = async () => {
        try {
            setLoading(true);
            // For mini admin, always fetch only their own data
            const userId = miniAdmin ? user.id : null;
            const data = await locationService.getAll(userId);
            setLocations(Array.isArray(data) ? data : data.locations || []);
        } catch (error) {
            toast.error("Failed to fetch locations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, [miniAdmin]);

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

    const filteredLocations = locations.filter(loc =>
        loc.cityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.country?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && locations.length === 0) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-secondary">Loading locations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold">{miniAdmin ? 'My Locations' : 'All Locations'}</h2>
                    <p className="text-text-secondary mt-1">
                        {miniAdmin ? 'Manage your locations' : 'Manage all locations in the system'}
                    </p>
                </div>
                <button onClick={() => handleOpenModal()} className="btn btn-primary flex items-center gap-2">
                    <Plus size={20} /> Add Location
                </button>
            </div>

            {/* Search Bar */}
            <div className="glass-panel p-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                    <input
                        type="text"
                        placeholder="Search locations by city or country..."
                        className="input pl-12 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Locations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLocations.map((loc) => (
                    <div key={loc.id} className="glass-panel overflow-hidden hover-lift">
                        <div className="relative h-48 bg-bg-secondary">
                            {loc.thumbnail ? (
                                <img src={loc.thumbnail} alt={loc.cityName} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-text-secondary">
                                    <Camera size={48} />
                                </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                <h3 className="text-xl font-bold text-white">{loc.cityName}, {loc.country}</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                                {loc.description}
                            </p>
                            <div className="space-y-2 mb-4">
                                <span className="flex items-center gap-2 text-sm text-text-secondary">
                                    <Calendar size={14} className="text-primary" /> {loc.bestTimeToVisit}
                                </span>
                                <span className="flex items-center gap-2 text-sm text-text-secondary">
                                    <MapPin size={14} className="text-primary" /> {loc.coordinates || 'N/A'}
                                </span>
                            </div>
                            {(isSuperAdmin || (isMiniAdmin && loc.UserId === user.id)) && (
                                <div className="flex gap-2 pt-4 border-t border-glass-border">
                                    <button
                                        onClick={() => handleOpenModal(loc)}
                                        className="btn btn-secondary flex-1 flex items-center justify-center gap-2"
                                    >
                                        <Edit2 size={16} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(loc.id)}
                                        className="btn bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex-1 flex items-center justify-center gap-2"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredLocations.length === 0 && !loading && (
                <div className="glass-panel p-16 text-center">
                    <MapPin className="w-16 h-16 text-text-secondary mx-auto mb-4" />
                    <p className="text-xl text-text-secondary mb-2">No locations found</p>
                    <p className="text-text-secondary mb-6">
                        {searchTerm ? 'Try a different search term' : 'Start by adding your first location'}
                    </p>
                    {!searchTerm && (
                        <button onClick={() => handleOpenModal()} className="btn btn-primary">
                            <Plus size={20} className="mr-2" /> Add Location
                        </button>
                    )}
                </div>
            )}

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingLoc ? 'Edit Location' : 'Add New Location'}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">City Name *</label>
                            <input
                                type="text"
                                required
                                className="input"
                                placeholder="e.g., Islamabad"
                                value={formData.cityName}
                                onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Country *</label>
                            <input
                                type="text"
                                required
                                className="input"
                                placeholder="e.g., Pakistan"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Thumbnail URL</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="https://example.com/image.jpg"
                            value={formData.thumbnail}
                            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                        />
                        {formData.thumbnail && (
                            <div className="mt-2 rounded-lg overflow-hidden">
                                <img src={formData.thumbnail} alt="Preview" className="w-full h-40 object-cover" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            rows="4"
                            className="input"
                            placeholder="Describe this location..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Best Time to Visit</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="e.g., March to May"
                                value={formData.bestTimeToVisit}
                                onChange={(e) => setFormData({ ...formData, bestTimeToVisit: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Coordinates</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="e.g., 33.6844° N, 73.0479° E"
                                value={formData.coordinates}
                                onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-glass-border">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {editingLoc ? 'Update Location' : 'Create Location'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default LocationsManagement;
