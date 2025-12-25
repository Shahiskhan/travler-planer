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

    if (loading && airlines.length === 0) return <div className="text-center mt-8">Loading partner airlines...</div>;

    return (
        <div className="container">
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>Our Airline Partners</h2>
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
                            <Plus size={20} /> Add Airline
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {airlines.map((airline) => (
                    <div key={airline.id} className="glass-panel airline-card text-center animate-fade-in">
                        <div className="airline-logo-wrapper">
                            {airline.logo ? (
                                <img src={airline.logo} alt={airline.name} className="airline-logo" />
                            ) : (
                                <Plane size={40} className="text-secondary" />
                            )}
                        </div>
                        <h3 className="airline-name">{airline.name}</h3>
                        <div className="airline-code">{airline.code}</div>
                        <p className="airline-country"><Shield size={14} /> {airline.country || 'International'}</p>

                        <div className="airline-links">
                            {airline.website && <a href={airline.website} target="_blank" rel="noreferrer" title="Website"><Globe size={18} /></a>}
                            {airline.contactEmail && <a href={`mailto:${airline.contactEmail}`} title="Email"><Mail size={18} /></a>}
                        </div>

                        {(isSuperAdmin || (isMiniAdmin && airline.UserId === user.id)) && (
                            <div className="admin-actions">
                                <button onClick={() => handleOpenModal(airline)} className="icon-btn edit" title="Edit your work"><Edit2 size={14} /></button>
                                <button onClick={() => handleDelete(airline.id)} className="icon-btn delete" title="Delete your work"><Trash2 size={16} /></button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {airlines.length === 0 && !loading && (
                <div className="glass-panel empty-state">
                    <p>No airlines listed yet.</p>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingAirline ? 'Edit Airline' : 'Add New Airline'}
            >
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-group full-width">
                        <label>Airline Name</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Airline Code (e.g. PK, EK)</label>
                        <input
                            type="text"
                            required
                            className="input"
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        />
                    </div>
                    <div className="form-group full-width">
                        <label>Logo URL</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.logo}
                            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
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
                    <div className="form-group">
                        <label>Contact Email</label>
                        <input
                            type="email"
                            className="input"
                            value={formData.contactEmail}
                            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        />
                    </div>
                    <div className="form-actions full-width">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {editingAirline ? 'Update Airline' : 'Create Airline'}
                        </button>
                    </div>
                </form>
            </Modal>

            <style jsx>{`
                .container { padding: 2rem 0; }
                
                .airline-card {
                    padding: 2.5rem 1.5rem;
                    position: relative;
                    transition: all 0.3s;
                }
                .airline-card:hover { border-color: var(--primary); transform: translateY(-5px); }

                .airline-logo-wrapper {
                    width: 70px;
                    height: 70px;
                    margin: 0 auto 1.5rem;
                    background: rgba(255,255,255,0.05);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }
                .airline-logo { width: 100%; height: 100%; object-fit: contain; padding: 10px; }

                .airline-name { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
                .airline-code { font-size: 0.8rem; font-weight: 800; color: var(--primary); letter-spacing: 2px; margin-bottom: 0.5rem; }
                .airline-country { font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: center; justify-content: center; gap: 0.25rem; }

                .airline-links {
                    margin-top: 1.5rem;
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                }
                .airline-links a { color: var(--text-secondary); transition: color 0.3s; }
                .airline-links a:hover { color: var(--primary); }

                .admin-actions {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .icon-btn {
                    width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    border: 1px solid var(--glass-border);
                    background: transparent;
                    color: var(--text-secondary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .icon-btn:hover { color: white; background: var(--primary); border-color: var(--primary); }
                .icon-btn.delete:hover { background: var(--danger); border-color: var(--danger); }

                .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
                .full-width { grid-column: span 2; }
                .empty-state { padding: 4rem; text-align: center; color: var(--text-secondary); }
            `}</style>
        </div>
    );
};

export default Airlines;
