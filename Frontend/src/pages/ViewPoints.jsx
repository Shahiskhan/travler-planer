import React, { useEffect, useState } from 'react';
import { viewpointService } from '../services/resourceService';
import { useAuth } from '../context/AuthContext';
import { Camera, Clock, Info, Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
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

    if (loading && viewpoints.length === 0) return <div className="text-center mt-8">Discovering best viewpoints...</div>;

    return (
        <div className="container">
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>Tourist Attractions</h2>
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
                            <Plus size={20} /> Add ViewPoint
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {viewpoints.map((vp) => (
                    <div key={vp.id} className="glass-panel card vp-card" style={{ padding: 0 }}>
                        <div className="card-image-wrapper">
                            {vp.bannerImage ? (
                                <img src={vp.bannerImage} alt={vp.name} className="card-img" />
                            ) : (
                                <div className="flex-center placeholder-img">
                                    <ImageIcon size={48} />
                                </div>
                            )}
                            <div className="fee-tag">{vp.entryFee > 0 ? `Rs. ${vp.entryFee}` : 'Free Entry'}</div>
                            {(isSuperAdmin || (isMiniAdmin && vp.UserId === user.id)) && (
                                <div className="admin-actions">
                                    <button onClick={() => handleOpenModal(vp)} className="action-btn edit" title="Edit your work"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(vp.id)} className="action-btn delete" title="Delete your work"><Trash2 size={16} /></button>
                                </div>
                            )}
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">{vp.name}</h3>
                            <div className="flex-center opening-hours">
                                <Clock size={14} /> {vp.openingHours || 'Open 24/7'}
                            </div>
                            <p className="card-desc">{vp.description}</p>
                            <button className="btn btn-outline btn-sm full-width flex-center" style={{ gap: '0.5rem' }}>
                                <Info size={16} /> View Gallery
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {viewpoints.length === 0 && !loading && (
                <div className="glass-panel empty-state">
                    <p>No viewpoints discovered yet. Be the first to add one!</p>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingVP ? 'Edit ViewPoint' : 'Add New ViewPoint'}
            >
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-group full-width">
                        <label>ViewPoint Name</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group full-width">
                        <label>Banner Image URL</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.bannerImage}
                            onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
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
                        <label>Opening Hours</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="e.g. 9:00 AM - 6:00 PM"
                            value={formData.openingHours}
                            onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Entry Fee (PKR)</label>
                        <input
                            type="number"
                            className="input"
                            value={formData.entryFee}
                            onChange={(e) => setFormData({ ...formData, entryFee: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="form-actions full-width">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {editingVP ? 'Update ViewPoint' : 'Create ViewPoint'}
                        </button>
                    </div>
                </form>
            </Modal>

            <style jsx>{`
                .container { padding: 2rem 0; }
                .vp-card { overflow: hidden; transition: transform 0.3s ease; }
                .vp-card:hover { transform: translateY(-5px); }

                .card-image-wrapper { height: 220px; position: relative; background: #1e293b; }
                .card-img { width: 100%; height: 100%; object-fit: cover; }
                .placeholder-img { height: 100%; color: var(--text-secondary); }

                .fee-tag {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: var(--bg-card);
                    color: var(--accent);
                    padding: 0.3rem 0.8rem;
                    border-radius: 0.5rem;
                    font-weight: 700;
                    font-size: 0.8rem;
                    border: 1px solid var(--glass-border);
                    backdrop-filter: blur(8px);
                }

                .admin-actions {
                    position: absolute;
                    bottom: 1rem;
                    right: 1rem;
                    display: flex;
                    gap: 0.5rem;
                }

                .action-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
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

                .card-body { padding: 1.5rem; }
                .card-title { margin: 0 0 0.5rem 0; font-size: 1.4rem; font-weight: 700; color: var(--text-primary); }
                
                .opening-hours { justify-content: flex-start; gap: 0.5rem; font-size: 0.85rem; color: var(--accent); margin-bottom: 1rem; }
                
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

                .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
                .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
                .full-width { grid-column: span 2; }
                .form-group label { font-size: 0.85rem; color: var(--text-secondary); }
                .form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
                
                .empty-state { padding: 4rem; text-align: center; color: var(--text-secondary); }
            `}</style>
        </div>
    );
};

export default ViewPoints;
