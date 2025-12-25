import React, { useEffect, useState } from 'react';
import { viewpointService } from '../services/resourceService';
import { useAuth } from '../context/AuthContext';
import { Clock, Info, Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Modal from '../components/Modal';

const ViewPoints = () => {
    const { user } = useAuth();
    const [viewpoints, setViewpoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showOnlyMine, setShowOnlyMine] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVP, setEditingVP] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        bannerImage: '',
        openingHours: '',
        entryFee: 0
    });

    const isSuperAdmin = user?.role === 'ADMIN';
    const isMiniAdmin = user?.role === 'MINI_ADMIN';
    const isAnyAdmin = isSuperAdmin || isMiniAdmin;

    const fetchViewpoints = async () => {
        try {
            setLoading(true);
            const data = await viewpointService.getAll(showOnlyMine ? user.id : null);
            setViewpoints(Array.isArray(data) ? data : data.viewpoints || []);
        } catch (error) {
            toast.error("Failed to fetch viewpoints");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchViewpoints();
    }, [showOnlyMine]);

    const handleOpenModal = (vp = null) => {
        if (vp) {
            setEditingVP(vp);
            setFormData({
                name: vp.name,
                description: vp.description,
                bannerImage: vp.bannerImage,
                openingHours: vp.openingHours,
                entryFee: vp.entryFee
            });
        } else {
            setEditingVP(null);
            setFormData({
                name: '',
                description: '',
                bannerImage: '',
                openingHours: '',
                entryFee: 0
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingVP) {
                await viewpointService.update(editingVP.id, formData);
                toast.success('ViewPoint updated successfully');
            } else {
                await viewpointService.create(formData);
                toast.success('ViewPoint created successfully');
            }
            setIsModalOpen(false);
            fetchViewpoints();
        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this viewpoint?')) {
            try {
                await viewpointService.delete(id);
                toast.success('ViewPoint deleted successfully');
                fetchViewpoints();
            } catch (error) {
                toast.error("Failed to delete viewpoint");
            }
        }
    };

    if (loading && viewpoints.length === 0) return <div className="text-center mt-8 text-text-secondary">Discovering best viewpoints...</div>;

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h2 className="text-4xl font-bold text-white">Tourist Attractions</h2>
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
                            <Plus size={20} /> Add ViewPoint
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {viewpoints.map((vp) => (
                    <div key={vp.id} className="glass-panel overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                        <div className="relative h-56 bg-card">
                            {vp.bannerImage ? (
                                <img src={vp.bannerImage} alt={vp.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-text-secondary">
                                    <ImageIcon size={48} />
                                </div>
                            )}
                            <div className="absolute top-4 right-4 bg-card/60 backdrop-blur-md text-white px-3 py-1 rounded-lg font-bold text-sm border border-white/10">
                                {vp.entryFee > 0 ? `Rs. ${vp.entryFee}` : 'Free Entry'}
                            </div>
                            {(isSuperAdmin || (isMiniAdmin && vp.UserId === user.id)) && (
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <button onClick={() => handleOpenModal(vp)} className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-primary transition-colors" title="Edit">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(vp.id)} className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-red-500 transition-colors" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">{vp.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-primary mb-4">
                                <Clock size={14} /> {vp.openingHours || 'Open 24/7'}
                            </div>
                            <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                                {vp.description}
                            </p>
                            <button className="btn btn-outline w-full text-sm py-2 flex items-center justify-center gap-2">
                                <Info size={16} /> View Gallery
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {viewpoints.length === 0 && !loading && (
                <div className="glass-panel p-16 text-center text-text-secondary">
                    <p className="text-xl">No viewpoints discovered yet. Be the first to add one!</p>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingVP ? 'Edit ViewPoint' : 'Add New ViewPoint'}
            >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm text-text-secondary">ViewPoint Name</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm text-text-secondary">Banner Image URL</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.bannerImage}
                            onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm text-text-secondary">Description</label>
                        <textarea
                            rows="4"
                            className="input"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Opening Hours</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="e.g. 9:00 AM - 6:00 PM"
                            value={formData.openingHours}
                            onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-text-secondary">Entry Fee (PKR)</label>
                        <input
                            type="number"
                            className="input"
                            value={formData.entryFee}
                            onChange={(e) => setFormData({ ...formData, entryFee: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {editingVP ? 'Update ViewPoint' : 'Create ViewPoint'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ViewPoints;
