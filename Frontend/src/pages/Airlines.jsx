import React, { useEffect, useState } from 'react';
import { airlineService } from '../services/resourceService';
import { useAuth } from '../context/AuthContext';
import { Plane, Globe, Mail, Plus, Edit2, Trash2, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Modal from '../components/Modal';

const Airlines = () => {
    const { user } = useAuth();
    const [airlines, setAirlines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showOnlyMine, setShowOnlyMine] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAirline, setEditingAirline] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        logo: '',
        country: '',
        website: '',
        contactEmail: ''
    });

    const isSuperAdmin = user?.role === 'ADMIN';
    const isMiniAdmin = user?.role === 'MINI_ADMIN';
    const isAnyAdmin = isSuperAdmin || isMiniAdmin;

    const fetchAirlines = async () => {
        try {
            setLoading(true);
            const data = await airlineService.getAll(showOnlyMine ? user.id : null);
            setAirlines(Array.isArray(data) ? data : data.airlines || []);
        } catch (error) {
            toast.error("Failed to fetch airlines");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAirlines();
    }, [showOnlyMine]);

    const handleOpenModal = (airline = null) => {
        if (airline) {
            setEditingAirline(airline);
            setFormData({
                name: airline.name,
                code: airline.code,
                logo: airline.logo,
                country: airline.country,
                website: airline.website,
                contactEmail: airline.contactEmail
            });
        } else {
            setEditingAirline(null);
            setFormData({
                name: '',
                code: '',
                logo: '',
                country: '',
                website: '',
                contactEmail: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAirline) {
                await airlineService.update(editingAirline.id, formData);
                toast.success('Airline updated successfully');
            } else {
                await airlineService.create(formData);
                toast.success('Airline created successfully');
            }
            setIsModalOpen(false);
            fetchAirlines();
        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this airline?')) {
            try {
                await airlineService.delete(id);
                toast.success('Airline deleted successfully');
                fetchAirlines();
            } catch (error) {
                toast.error("Failed to delete airline");
            }
        }
    };

    if (loading && airlines.length === 0) return <div className="text-center mt-8 text-text-secondary">Loading partner airlines...</div>;

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h2 className="text-4xl font-bold text-white">Our Airline Partners</h2>
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
                            <Plus size={20} /> Add Airline
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {airlines.map((airline) => (
                    <div key={airline.id} className="glass-panel relative p-8 text-center hover:-translate-y-2 hover:border-primary transition-all duration-300">
                        <div className="w-20 h-20 mx-auto mb-6 bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10">
                            {airline.logo ? (
                                <img src={airline.logo} alt={airline.name} className="w-full h-full object-contain p-2" />
                            ) : (
                                <Plane size={32} className="text-text-secondary" />
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{airline.name}</h3>
                        <div className="text-sm font-bold text-primary tracking-widest mb-3">{airline.code}</div>
                        <p className="flex items-center justify-center gap-2 text-sm text-text-secondary mb-6">
                            <Shield size={14} /> {airline.country || 'International'}
                        </p>

                        <div className="flex items-center justify-center gap-4">
                            {airline.website && (
                                <a href={airline.website} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-primary transition-colors" title="Website">
                                    <Globe size={18} />
                                </a>
                            )}
                            {airline.contactEmail && (
                                <a href={`mailto:${airline.contactEmail}`} className="text-text-secondary hover:text-primary transition-colors" title="Email">
                                    <Mail size={18} />
                                </a>
                            )}
                        </div>

                        {(isSuperAdmin || (isMiniAdmin && airline.UserId === user.id)) && (
                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                                <button onClick={() => handleOpenModal(airline)} className="p-1.5 rounded-lg border border-white/10 text-text-secondary hover:bg-white/5 hover:text-primary transition-colors" title="Edit">
                                    <Edit2 size={14} />
                                </button>
                                <button onClick={() => handleDelete(airline.id)} className="p-1.5 rounded-lg border border-white/10 text-text-secondary hover:bg-white/5 hover:text-red-500 transition-colors" title="Delete">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {airlines.length === 0 && !loading && (
                <div className="glass-panel p-16 text-center text-text-secondary">
                    <p className="text-xl">No airlines listed yet.</p>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingAirline ? 'Edit Airline' : 'Add New Airline'}
            >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm text-text-secondary">Airline Name</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Airline Code (e.g. PK, EK)</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Country</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm text-text-secondary">Logo URL</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.logo}
                            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
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
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Contact Email</label>
                        <input
                            type="email"
                            className="input"
                            value={formData.contactEmail}
                            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {editingAirline ? 'Update Airline' : 'Create Airline'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Airlines;
