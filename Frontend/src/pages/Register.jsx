import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'USER' // Default
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(formData);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: '80vh', padding: '2rem 0' }}>
            <div className="glass-panel card" style={{ maxWidth: '500px', width: '100%', padding: '2rem' }}>
                <h2 className="text-center" style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>Create Account</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                className="form-input"
                                style={{ paddingLeft: '3rem' }}
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="email"
                                className="form-input"
                                style={{ paddingLeft: '3rem' }}
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <div style={{ position: 'relative' }}>
                            <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                className="form-input"
                                style={{ paddingLeft: '3rem' }}
                                placeholder="03001234567"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="password"
                                className="form-input"
                                style={{ paddingLeft: '3rem' }}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Account Type</label>
                        <div className="role-selection">
                            <label className={`role-card ${formData.role === 'USER' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="USER"
                                    checked={formData.role === 'USER'}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                />
                                <div className="role-info">
                                    <span className="role-title">Traveler</span>
                                    <span className="role-desc">Explore destinations & book services</span>
                                </div>
                            </label>

                            <label className={`role-card ${formData.role === 'MINI_ADMIN' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="MINI_ADMIN"
                                    checked={formData.role === 'MINI_ADMIN'}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                />
                                <div className="role-info">
                                    <span className="role-title">Travel Services Partner</span>
                                    <span className="role-desc">Manage hotels, flights & attractions</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <style jsx>{`
                        .role-selection {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 1rem;
                            margin-top: 0.5rem;
                        }
                        .role-card {
                            border: 1px solid var(--glass-border);
                            padding: 1rem;
                            border-radius: 12px;
                            cursor: pointer;
                            transition: all 0.3s;
                            background: rgba(255, 255, 255, 0.02);
                            display: flex;
                            align-items: flex-start;
                            gap: 0.75rem;
                        }
                        .role-card:hover {
                            border-color: var(--primary);
                            background: rgba(59, 130, 246, 0.05);
                        }
                        .role-card.active {
                            border-color: var(--primary);
                            background: rgba(59, 130, 246, 0.1);
                            box-shadow: 0 0 0 1px var(--primary);
                        }
                        .role-card input {
                            margin-top: 0.25rem;
                        }
                        .role-info {
                            display: flex;
                            flex-direction: column;
                        }
                        .role-title {
                            font-weight: 700;
                            font-size: 0.95rem;
                            color: var(--text-primary);
                        }
                        .role-desc {
                            font-size: 0.75rem;
                            color: var(--text-secondary);
                            line-height: 1.3;
                            margin-top: 0.2rem;
                        }
                        @media (max-width: 480px) {
                            .role-selection {
                                grid-template-columns: 1fr;
                            }
                        }
                    `}</style>

                    <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1rem' }}>
                        Get Started
                    </button>
                </form>

                <p className="text-center" style={{ marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
