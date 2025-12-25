import React, { useEffect, useState } from 'react';
import { hotelService } from '../services/resourceService';
import { useAuth } from '../context/AuthContext';
import { Hotel as HotelIcon, Star, MapPin, Phone, Globe, Plus, Edit2, Trash2, Camera } from 'lucide-react';
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
            <Star key={i} size={14} fill={i < count ? "var(--accent)" : "transparent"} color={i < count ? "var(--accent)" : "var(--text-secondary)"} />
        ));
    };

    if (loading && hotels.length === 0) return <div className="text-center mt-8">Finding the best stays...</div>;

    return (
        <div className="container">
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>Luxury Stays</h2>
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
                            <Plus size={20} /> Add Hotel
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="glass-panel card hotel-card" style={{ padding: 0 }}>
                        <div className="card-image-wrapper">
                            {hotel.image ? (
                                <img src={hotel.image} alt={hotel.name} className="card-img" />
                            ) : (
                                <div className="flex-center placeholder-img">
                                    <HotelIcon size={48} />
                                </div>
                            )}
                            <div className="price-tag">Rs. {hotel.pricePerNight} <span>/ night</span></div>
                            {(isSuperAdmin || (isMiniAdmin && hotel.UserId === user.id)) && (
                                <div className="admin-actions">
                                    <button onClick={() => handleOpenModal(hotel)} className="action-btn edit" title="Edit your work"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(hotel.id)} className="action-btn delete" title="Delete your work"><Trash2 size={16} /></button>
                                </div>
                            )}
                        </div>
                        <div className="card-body">
                            <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h3 className="card-title">{hotel.name}</h3>
                                <div className="flex-center stars">{renderStars(hotel.starCategory)}</div>
                            </div>
                            <p className="flex-center address"><MapPin size={14} /> {hotel.address}</p>
                            <p className="card-desc">{hotel.description}</p>
                            <div className="amenities">
                                {hotel.amenities?.split(',').map((am, idx) => (
                                    <span key={idx} className="amenity-badge">{am.trim()}</span>
                                ))}
                            </div>
                            <div className="card-footer">
                                {hotel.contactNumber && <span className="flex-center footer-item"><Phone size={14} /> {hotel.contactNumber}</span>}
                                {hotel.website && <a href={hotel.website} target="_blank" rel="noreferrer" className="flex-center footer-item link"><Globe size={14} /> Website</a>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {hotels.length === 0 && !loading && (
                <div className="glass-panel empty-state">
                    <p>No hotels found. Start adding some luxury!</p>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
            >
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-group full-width">
                        <label>Hotel Name</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group full-width">
                        <label>Address</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Star Category</label>
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
                    <div className="form-group">
                        <label>Price Per Night (PKR)</label>
                        <input
                            type="number"
                            required
                            className="input"
                            value={formData.pricePerNight}
                            onChange={(e) => setFormData({ ...formData, pricePerNight: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="form-group full-width">
                        <label>Image URL</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>
                    <div className="form-group full-width">
                        <label>Description</label>
                        <textarea
                            rows="3"
                            className="input"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="form-group full-width">
                        <label>Amenities (comma separated)</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="WiFi, Pool, Breakfast..."
                            value={formData.amenities}
                            onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact Number</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.contactNumber}
                            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Website</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        />
                    </div>
                    <div className="form-actions full-width">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {editingHotel ? 'Update Hotel' : 'Create Hotel'}
                        </button>
                    </div>
                </form>
            </Modal>

            <style jsx>{`
                .container { padding: 2rem 0; }
                .hotel-card { overflow: hidden; transition: transform 0.3s ease; }
                .hotel-card:hover { transform: translateY(-5px); }

                .card-image-wrapper { height: 200px; position: relative; background: #1e293b; }
                .card-img { width: 100%; height: 100%; object-fit: cover; }
                .placeholder-img { height: 100%; color: var(--text-secondary); }

                .price-tag {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: var(--primary);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 2rem;
                    font-weight: bold;
                    font-size: 0.9rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }
                .price-tag span { font-weight: normal; font-size: 0.75rem; opacity: 0.9; }

                .admin-actions {
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
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
                    background: rgba(15, 23, 42, 0.7);
                    color: white;
                    backdrop-filter: blur(4px);
                }
                .action-btn:hover { background: var(--primary); }
                .action-btn.delete:hover { background: var(--danger); }

                .card-body { padding: 1.5rem; }
                .card-title { margin: 0; font-size: 1.25rem; font-weight: 700; color: var(--text-primary); }
                
                .address { justify-content: flex-start; gap: 0.25rem; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; }
                
                .card-desc {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    line-height: 1.5;
                    margin-bottom: 1.25rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .amenities { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
                .amenity-badge {
                    background: rgba(96, 165, 250, 0.1);
                    color: var(--primary);
                    padding: 0.25rem 0.75rem;
                    border-radius: 1rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: 1px solid rgba(96, 165, 250, 0.2);
                }

                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    border-top: 1px solid var(--glass-border);
                    padding-top: 1rem;
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                }

                .footer-item { gap: 0.25rem; }
                .link { color: var(--primary); text-decoration: none; }
                .link:hover { text-decoration: underline; }

                .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
                .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
                .full-width { grid-column: span 2; }
                .form-group label { font-size: 0.85rem; color: var(--text-secondary); }
                .form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
            `}</style>
        </div>
    );
};

export default Hotels;
