import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapPin, Hotel, Plane, ArrowRight, Star, Globe, Shield, Users,
    Check, Calendar, CreditCard, Headphones, Heart, Compass, Search, Home as HomeIcon
} from 'lucide-react';

import heroBg from '../landingPageImages/hero-bg.jpg';
import hunzaImg from '../landingPageImages/hunza.jpg';
import swatImg from '../landingPageImages/swat.jpg';
import skarduImg from '../landingPageImages/skardu.jpg';
import fairyMeadowsImg from '../landingPageImages/fairy-meadows.jpg';
import hunzaSmallImg from '../landingPageImages/hunza-small.jpg';

const Home = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');

    const categories = [
        { id: 'hotels', name: 'Private Hotels', icon: <Hotel className="w-5 h-5" /> },
        { id: 'camping', name: 'Camping Pods', icon: <Compass className="w-5 h-5" /> },
        { id: 'resthouses', name: 'Govt Rest Houses', icon: <HomeIcon className="w-5 h-5" /> },
        { id: 'tours', name: 'Tour Packages', icon: <MapPin className="w-5 h-5" /> },
    ];

    const popularDestinations = [
        { name: 'Hunza Valley', image: hunzaImg, rating: 4.9, tag: 'Culture & History', price: '15,000' },
        { name: 'Swat Valley', image: swatImg, rating: 4.8, tag: 'Nature', price: '12,500' },
        { name: 'Skardu', image: skarduImg, rating: 4.7, tag: 'Adventure', price: '22,000' },
        { name: 'Fairy Meadows', image: fairyMeadowsImg, rating: 4.9, tag: 'Trekking', price: '18,000' },
    ];

    const services = [
        { title: 'Destinations', desc: 'Explore the hidden gems', icon: <MapPin className="w-8 h-8 text-white" />, color: 'bg-emerald-600' },
        { title: 'Attractions', desc: 'Must-visit spots', icon: <Compass className="w-8 h-8 text-white" />, color: 'bg-amber-600' },
        { title: 'Events', desc: 'Cultural festivals', icon: <Calendar className="w-8 h-8 text-white" />, color: 'bg-blue-600' },
        { title: 'Plan Trip', desc: 'Itineraries & guides', icon: <Globe className="w-8 h-8 text-white" />, color: 'bg-rose-600' },
    ];

    return (
        <div className="pb-10 font-sans transition-colors duration-300">
            {/* Hero Section */}
            <div className="relative h-[85vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={heroBg}
                        alt="Beautiful Pakistan"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                        Discover Pakistan
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide uppercase mb-12 drop-shadow-md">
                        Land of Hospitality, Mountains & Heritage
                    </p>

                    {/* Search Widget */}
                    <div className="w-full max-w-4xl bg-white dark:bg-card p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 animate-fade-in">
                        <div className="flex-1 relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 group-focus-within:scale-110 transition-transform" />
                            <input
                                type="text"
                                placeholder="Where to in Pakistan?"
                                className="w-full h-14 pl-12 pr-4 bg-gray-50 dark:bg-black/5 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-text-primary"
                            />
                        </div>
                        <div className="flex-1 relative group h-14 md:h-auto">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 group-focus-within:scale-110 transition-transform" />
                            <input
                                type="date"
                                className="w-full h-14 pl-12 pr-4 bg-gray-50 dark:bg-black/5 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-text-primary cursor-pointer"
                            />
                        </div>
                        <button
                            onClick={() => navigate('/locations')}
                            className="bg-primary hover:bg-emerald-700 text-white h-14 px-8 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Search className="w-5 h-5" />
                            Search
                        </button>
                    </div>
                </div>

                {/* Bottom decorative curve */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-dark rounded-t-[50%] scale-x-150 translate-y-8" />
            </div>

            {/* Quick Services Grid */}
            <div className="container mx-auto px-6 -mt-16 relative z-10 mb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, idx) => (
                        <div key={idx} className={`${service.color} p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform cursor-pointer text-white`}>
                            <div className="mb-4 bg-white/20 w-fit p-3 rounded-xl backdrop-blur-sm">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                            <p className="text-white/80 text-sm font-medium">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Discover Categories */}
            <section className="container mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-text-primary mb-4">Experience Pakistan</h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        From the peaks of the North to the shores of the South, explore diversity, culture, and nature.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-6 py-2.5 rounded-full font-semibold transition-all ${activeTab === 'all' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 dark:bg-white/5 text-text-secondary hover:bg-gray-200 dark:hover:bg-white/10'}`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`px-6 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 ${activeTab === cat.id ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 dark:bg-white/5 text-text-secondary hover:bg-gray-200 dark:hover:bg-white/10'}`}
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {popularDestinations.map((destination, index) => (
                        <div
                            key={index}
                            onClick={() => navigate('/locations')}
                            className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-border"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 dark:bg-black/70 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-text-primary">
                                        {destination.tag}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                                        {destination.name}
                                    </h3>
                                    <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-md">
                                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                        <span className="text-xs font-bold text-amber-700 dark:text-amber-500">{destination.rating}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-text-secondary text-sm mb-4">
                                    <MapPin className="w-4 h-4" />
                                    <span>Pakistan</span>
                                </div>

                                <div className="border-t border-border pt-4 flex justify-between items-center">
                                    <div>
                                        <p className="text-xs text-text-secondary uppercase font-semibold">Starting from</p>
                                        <p className="text-lg font-bold text-primary">₨ {destination.price}</p>
                                    </div>
                                    <button className="p-2 rounded-full bg-gray-50 dark:bg-white/5 hover:bg-primary hover:text-white transition-colors group-hover:rotate-45">
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button onClick={() => navigate('/locations')} className="btn-outline border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-bold">
                        View All Pakistan Destinations
                    </button>
                </div>
            </section>

            {/* Visit KP / Features -> Visit Pakistan */}
            <section className="bg-bg-secondary dark:bg-black/20 py-20">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl" />
                            <div className="relative z-10 grid grid-cols-2 gap-4">
                                <img src={hunzaSmallImg} className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8" alt="Feature 1" />
                                <img src={swatImg} className="rounded-2xl shadow-lg w-full h-64 object-cover" alt="Feature 2" />
                            </div>
                        </div>

                        <div>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Why Visit Pakistan?</span>
                            <h2 className="text-4xl font-bold text-text-primary mb-6">A Land of Wonders</h2>
                            <p className="text-text-secondary text-lg leading-relaxed mb-8">
                                From the snow-capped peaks of the Himalayas, Karakoram, and Hindu Kush to the lush green valleys and historic civilizations,
                                Pakistan offers a journey through time and nature.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: 'Secure & Safe Tourism', desc: 'Verified security protocols for all major tourist spots.' },
                                    { title: 'Rich Heritage', desc: 'Home to ancient civilizations like Indus Valley and Gandhara.' },
                                    { title: 'Warm Hospitality', desc: 'Experience the world-renowned hospitality of Pakistani people.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                            <Check className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-text-primary">{item.title}</h4>
                                            <p className="text-text-secondary">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="container mx-auto px-6 py-20">
                <div className="bg-primary rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden isolate">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/30 rounded-full blur-3xl" />

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Start Your Adventure Today</h2>
                    <p className="text-white/90 text-xl max-w-2xl mx-auto mb-10 relative z-10">
                        Join thousands of travelers exploring the beauty of Pakistan. Register now to book your perfect stay.
                    </p>
                    <div className="flex gap-4 justify-center relative z-10">
                        <button onClick={() => navigate('/register')} className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
                            Create Account
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;