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
        <div className="flex items-center justify-center min-h-[80vh] py-10">
            <div className="glass-panel w-full max-w-lg p-8">
                <h2 className="text-center text-3xl font-bold mb-8">Create Account</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Full Name</label>
                        <div className="relative">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                            <input
                                type="text"
                                className="input pl-12"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Email Address</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                            <input
                                type="email"
                                className="input pl-12"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                            <input
                                type="text"
                                className="input pl-12"
                                placeholder="03001234567"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                            <input
                                type="password"
                                className="input pl-12"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Account Type</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            <label className={`cursor-pointer border border-glass-border p-4 rounded-xl transition-all hover:bg-primary/5 hover:border-primary/50 relative flex items-start gap-3 ${formData.role === 'USER' ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'bg-white/5'}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="USER"
                                    checked={formData.role === 'USER'}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="mt-1"
                                />
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">Traveler</span>
                                    <span className="text-xs text-text-secondary mt-1">Explore destinations & book services</span>
                                </div>
                            </label>

                            <label className={`cursor-pointer border border-glass-border p-4 rounded-xl transition-all hover:bg-primary/5 hover:border-primary/50 relative flex items-start gap-3 ${formData.role === 'MINI_ADMIN' ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'bg-white/5'}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="MINI_ADMIN"
                                    checked={formData.role === 'MINI_ADMIN'}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="mt-1"
                                />
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">Travel Services Partner</span>
                                    <span className="text-xs text-text-secondary mt-1">Manage hotels, flights & attractions</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-4">
                        Get Started
                    </button>
                </form>

                <p className="text-center mt-6 text-text-secondary">
                    Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
