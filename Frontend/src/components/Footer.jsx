import React, { useState } from 'react';
import {
    Facebook,
    Twitter,
    Instagram,
    Github,
    Linkedin,
    Mail,
    Send
} from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Handle feedback/subscription logic here
        console.log('Feedback/Subscribe:', email);
        setEmail('');
    };

    return (
        <footer className="bg-white dark:bg-card border-t border-border mt-auto transition-colors duration-300">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand & Description */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            TravelSys
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            We help you discover the world's most beautiful destinations with custom packages and premium services.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-primary transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-blue-600 transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-text-primary">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="/locations" className="hover:text-primary transition-colors">Destinations</a></li>
                            <li><a href="/flights" className="hover:text-primary transition-colors">Flights</a></li>
                            <li><a href="/hotels" className="hover:text-primary transition-colors">Hotels</a></li>
                            <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-text-primary">Support</h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
                            <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
                            <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Feedback/Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-text-primary">Feedback & News</h4>
                        <p className="text-text-secondary text-sm">
                            Subscribe to newsletter or send us your feedback to improve our services.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
                                <input
                                    type="email"
                                    placeholder="Your feedback or email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text-primary"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-primary py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                Send <Send size={16} />
                            </button>
                        </form>
                    </div>

                </div>

                <div className="border-t border-border mt-12 pt-8 text-center text-text-secondary text-sm">
                    <p>© {new Date().getFullYear()} TravelSys. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
