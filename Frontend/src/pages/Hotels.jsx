import React, { useEffect, useState } from 'react';
import { hotelService } from '../services/resourceService';
import { useAuth } from '../context/AuthContext';
import { Hotel as HotelIcon, Star, MapPin, Phone, Globe, Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Modal from '../components/Modal';

const Hotels = () => {
    const { user } = useAuth();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showOnlyMine, setShowOnlyMine] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingHotel, setEditingHotel] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        description: '',
        starCategory: '3_STAR',
        pricePerNight: 0,
        amenities: '',
        contactNumber: '',
        website: '',
        image: ''
    });

    const isSuperAdmin = user?.role === 'ADMIN';
    const isMiniAdmin = user?.role === 'MINI_ADMIN';
    const isAnyAdmin = isSuperAdmin || isMiniAdmin;

    const fetchHotels = async () => {
        try {
            setLoading(true);
            const data = await hotelService.getAll(showOnlyMine ? user.id : null);
            setHotels(Array.isArray(data) ? data : data.hotels || []);
        } catch (error) {
            toast.error("Failed to fetch hotels");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHotels();
    }, [showOnlyMine]);

    const handleOpenModal = (hotel = null) => {
        if (hotel) {
            setEditingHotel(hotel);
            setFormData({
                name: hotel.name,
                address: hotel.address,
                description: hotel.description,
                starCategory: hotel.starCategory,
                pricePerNight: hotel.pricePerNight,
                amenities: hotel.amenities,
                contactNumber: hotel.contactNumber,
                website: hotel.website,
                image: hotel.image
            });
        } else {
            setEditingHotel(null);
            setFormData({
                name: '',
                address: '',
                description: '',
                starCategory: '3_STAR',
                pricePerNight: 0,
                amenities: '',
                contactNumber: '',
                website: '',
                image: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingHotel) {
                await hotelService.update(editingHotel.id, formData);
                toast.success('Hotel updated successfully');
            } else {
                await hotelService.create(formData);
                toast.success('Hotel created successfully');
            }
            setIsModalOpen(false);
            fetchHotels();
        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            try {
                await hotelService.delete(id);
                toast.success('Hotel deleted successfully');
                fetchHotels();
            } catch (error) {
                toast.error("Failed to delete hotel");
            }
        }
    };

    const renderStars = (category) => {
        const count = parseInt(category[0]);
        return [...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < count ? "fill-accent text-accent" : "text-text-secondary"} />
        ));
    };

    if (loading && hotels.length === 0) return <div className="text-center mt-8 text-text-secondary">Finding the best stays...</div>;

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h2 className="text-4xl font-bold text-white">Luxury Stays</h2>
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
                            <Plus size={20} /> Add Hotel
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="glass-panel overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                        <div className="relative h-52 bg-card">
                            {hotel.image ? (
                                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-text-secondary">
                                    <HotelIcon size={48} />
                                </div>
                            )}
                            <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg">
                                Rs. {hotel.pricePerNight} <span className="font-normal text-xs opacity-90">/ night</span>
                            </div>
                            {(isSuperAdmin || (isMiniAdmin && hotel.UserId === user.id)) && (
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <button onClick={() => handleOpenModal(hotel)} className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-primary transition-colors" title="Edit">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(hotel.id)} className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-red-500 transition-colors" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-bold text-white">{hotel.name}</h3>
                                <div className="flex gap-0.5 mt-1">{renderStars(hotel.starCategory)}</div>
                            </div>
                            <p className="flex items-center gap-1 text-sm text-text-secondary mb-4">
                                <MapPin size={14} className="text-primary" /> {hotel.address}
                            </p>
                            <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-2">
                                {hotel.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {hotel.amenities?.split(',').map((am, idx) => (
                                    <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold border border-primary/20">
                                        {am.trim()}
                                    </span>
                                ))}
                            </div>
                            <div className="pt-4 border-t border-white/10 flex justify-between text-sm text-text-secondary">
                                {hotel.contactNumber && (
                                    <span className="flex items-center gap-1"><Phone size={14} /> {hotel.contactNumber}</span>
                                )}
                                {hotel.website && (
                                    <a href={hotel.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                                        <Globe size={14} /> Website
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {hotels.length === 0 && !loading && (
                <div className="glass-panel p-16 text-center text-text-secondary">
                    <p className="text-xl">No hotels found. Start adding some luxury!</p>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
            >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm text-text-secondary">Hotel Name</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm text-text-secondary">Address</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Star Category</label>
                        <select
                            className="input"
                            value={formData.starCategory}
                            onChange={(e) => setFormData({ ...formData, starCategory: e.target.value })}
                        >
                            <option value="1_STAR">1 Star</option>
                            <option value="2_STAR">2 Star</option>
                            <option value="3_STAR">3 Star</option>
                            <option value="4_STAR">4 Star</option>
                            <option value="5_STAR">5 Star</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Price Per Night (PKR)</label>
                        <input
                            type="number"
                            required
                            className="input"
                            value={formData.pricePerNight}
                            onChange={(e) => setFormData({ ...formData, pricePerNight: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm text-text-secondary">Image URL</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm text-text-secondary">Description</label>
                        <textarea
                            rows="3"
                            className="input"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm text-text-secondary">Amenities (comma separated)</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="WiFi, Pool, Breakfast..."
                            value={formData.amenities}
                            onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Contact Number</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.contactNumber}
                            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Website</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {editingHotel ? 'Update Hotel' : 'Create Hotel'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Hotels;
