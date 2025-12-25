import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Hotel, Plane, ArrowRight, Star, Globe, Shield, Users, 
  Check, Calendar, CreditCard, Headphones, Mountain, Utensils,
  Sunrise, Compass, Trophy, Heart
} from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto slide for testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            title: 'Exotic Locations',
            description: 'Discover hidden gems and popular destinations across Pakistan with curated travel guides.',
            icon: <MapPin className="w-8 h-8 text-primary" />,
            link: '/locations',
            color: 'from-blue-500/20 to-cyan-500/10'
        },
        {
            title: 'Luxury Hotels',
            description: 'Book premium stays with 5-star amenities, spa services, and breathtaking views.',
            icon: <Hotel className="w-8 h-8 text-secondary" />,
            link: '/hotels',
            color: 'from-amber-500/20 to-orange-500/10'
        },
        {
            title: 'Seamless Flights',
            description: 'Find and book flights with top-rated airlines at the best prices available.',
            icon: <Plane className="w-8 h-8 text-accent" />,
            link: '/flights',
            color: 'from-violet-500/20 to-purple-500/10'
        },
        {
            title: 'Local Experiences',
            description: 'Authentic cultural tours, food trails, and adventure activities with local guides.',
            icon: <Compass className="w-8 h-8 text-green-500" />,
            link: '/experiences',
            color: 'from-green-500/20 to-emerald-500/10'
        }
    ];

    const stats = [
        { number: '75+', label: 'Destinations', icon: <Globe className="w-6 h-6" />, suffix: 'Across Pakistan' },
        { number: '300+', label: 'Premium Hotels', icon: <Hotel className="w-6 h-6" />, suffix: '5-Star Rated' },
        { number: '25k+', label: 'Happy Travelers', icon: <Users className="w-6 h-6" />, suffix: 'This Year' },
        { number: '98%', label: 'Satisfaction', icon: <Heart className="w-6 h-6" />, suffix: 'Customer Rating' },
    ];

    const popularDestinations = [
        { name: 'Hunza Valley', image: 'https://images.unsplash.com/photo-1585506936724-fa0c19c7b3c4?auto=format&fit=crop&w=800', rating: 4.9, tag: 'Mountain Paradise' },
        { name: 'Swat Valley', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800', rating: 4.8, tag: 'Switzerland of East' },
        { name: 'Skardu', image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800', rating: 4.7, tag: 'Adventure Hub' },
        { name: 'Fairy Meadows', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800', rating: 4.9, tag: 'Nanga Parbat View' },
    ];

    const testimonials = [
        { name: 'Sarah Ahmed', role: 'Adventure Traveler', content: 'Best travel platform in Pakistan! The Swat Valley package exceeded all expectations.', rating: 5, avatar: 'SA' },
        { name: 'Ali Raza', role: 'Family Vacationer', content: 'Hotel booking was seamless, and the family discounts made our trip affordable.', rating: 5, avatar: 'AR' },
        { name: 'Fatima Khan', role: 'Honeymoon Planner', content: 'Hunza Valley trip organized perfectly. The luxury stay was absolutely magical!', rating: 5, avatar: 'FK' },
    ];

    const benefits = [
        { icon: <Shield className="w-6 h-6" />, title: 'Secure Booking', desc: '100% secure payment & data protection' },
        { icon: <Headphones className="w-6 h-6" />, title: '24/7 Support', desc: 'Round-the-clock customer assistance' },
        { icon: <CreditCard className="w-6 h-6" />, title: 'Best Price', desc: 'Guaranteed lowest prices or we match it' },
        { icon: <Calendar className="w-6 h-6" />, title: 'Flexible Dates', desc: 'Easy rescheduling & cancellation' },
    ];

    return (
        <div className="pb-20 overflow-hidden bg-gradient-to-b from-dark via-dark to-dark/95">
            {/* Hero Section - Enhanced */}
            <div className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-r from-primary/30 to-cyan-500/20 rounded-full blur-[120px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-gradient-to-r from-secondary/30 to-violet-500/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />
                <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-gradient-to-r from-accent/20 to-green-500/10 rounded-full blur-[80px] -z-10 animate-pulse delay-2000" />
                
                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden -z-10">
                    {[...Array(20)].map((_, i) => (
                        <div 
                            key={i}
                            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${10 + Math.random() * 10}s`
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-base font-medium text-primary animate-fade-in shadow-lg">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                            ✈️ Explore Pakistan's Beauty with Confidence
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            Discover <span className="text-primary">Magical</span> <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                                Pakistan Journeys
                            </span>
                        </h1>

                        <p className="text-xl text-text-secondary/90 max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            From the majestic mountains of the north to the serene beaches of the south, experience Pakistan like never before. 
                            We handle every detail so you can focus on making memories.
                        </p>

                        <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                            <button 
                                onClick={() => navigate('/locations')} 
                                className="btn btn-primary btn-lg group px-8 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                            >
                                Start Exploring
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                            </button>
                            <button 
                                onClick={() => navigate('/packages')} 
                                className="btn btn-outline btn-lg px-8 hover:bg-white/5"
                            >
                                View Packages
                            </button>
                        </div>

                        <div className="pt-8 flex flex-wrap items-center gap-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div 
                                            key={i} 
                                            className="w-12 h-12 rounded-full border-3 border-dark bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold shadow-lg"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-sm">
                                                {['SA', 'MR', 'AK', 'ZS'][i-1]}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                        <span className="ml-2 font-bold">4.9/5</span>
                                    </div>
                                    <p className="text-sm text-text-secondary">Rated by 25k+ travelers</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 text-sm text-text-secondary">
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span>Best Price Guarantee</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span>24/7 Support</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image/Graphics */}
                    <div className="relative hidden lg:block h-[600px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/5 rounded-3xl blur-3xl" />
                        
                        {/* Main Hero Image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585506936724-fa0c19c7b3c4?auto=format&fit=crop&w=1200')] bg-cover bg-center opacity-20 rounded-3xl" />
                        </div>

                        {/* Floating Cards with Enhanced Design */}
                        <div className="absolute top-8 right-8 p-5 glass-panel flex items-center gap-4 animate-float shadow-xl" style={{ animationDelay: '0s', width: '280px' }}>
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                                <MapPin className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-text-secondary">Top Destination</p>
                                <p className="font-bold text-lg">Hunza Valley</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm">4.9 • Mountain Paradise</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-24 left-8 p-5 glass-panel flex items-center gap-4 animate-float shadow-xl" style={{ animationDelay: '2s', width: '260px' }}>
                            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
                                <Hotel className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-text-secondary">Luxury Stay</p>
                                <p className="font-bold text-lg">Serena Hotels</p>
                                <p className="text-sm text-primary mt-1">⭐ 5-Star Experience</p>
                            </div>
                        </div>

                        <div className="absolute top-1/2 left-12 p-5 glass-panel flex items-center gap-4 animate-float shadow-xl" style={{ animationDelay: '4s', width: '250px' }}>
                            <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl">
                                <Plane className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-text-secondary">Flight Deal</p>
                                <p className="font-bold text-lg">Islamabad → Skardu</p>
                                <p className="text-sm text-green-500 mt-1">From ₨ 12,999</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section - Enhanced */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary">
                        Everything For Your Perfect Journey
                    </h2>
                    <p className="text-text-secondary text-lg md:text-xl">
                        Comprehensive travel solutions tailored for Pakistani explorers. From planning to memories, we've got you covered.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(feature.link)}
                            className="group p-7 rounded-3xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-3 cursor-pointer relative overflow-hidden backdrop-blur-sm"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            
                            <div className="relative z-10">
                                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-dark to-dark/80 border border-white/10 group-hover:border-primary/30 transition-colors duration-300 inline-block">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                                <p className="text-text-secondary mb-6">{feature.description}</p>
                                <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                                    Discover More <ArrowRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                                </span>
                            </div>
                            
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full group-hover:scale-150 transition-transform duration-700" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Destinations */}
            <section className="container mx-auto px-6 py-20">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">Popular Destinations</h2>
                        <p className="text-text-secondary">Most loved travel spots in Pakistan</p>
                    </div>
                    <button onClick={() => navigate('/locations')} className="btn btn-outline">
                        View All <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {popularDestinations.map((destination, index) => (
                        <div 
                            key={index}
                            className="group relative overflow-hidden rounded-3xl cursor-pointer"
                            onClick={() => navigate(`/location/${destination.name.toLowerCase().replace(' ', '-')}`)}
                        >
                            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                                <div 
                                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                    style={{ backgroundImage: `url(${destination.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
                            </div>
                            
                            <div className="absolute bottom-0 p-6 w-full">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs rounded-full mb-2 border border-primary/30">
                                            {destination.tag}
                                        </span>
                                        <h3 className="text-2xl font-bold">{destination.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-1 bg-dark/80 px-3 py-1 rounded-full">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-bold">{destination.rating}</span>
                                    </div>
                                </div>
                                <p className="text-text-secondary text-sm">Explore packages starting from ₨ 25,999</p>
                            </div>
                            
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary transition-colors">
                                    <Heart className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Section - Enhanced */}
            <section className="container mx-auto px-6 py-20">
                <div className="glass-panel p-12 relative overflow-hidden rounded-3xl border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-transparent" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-32 translate-x-32" />
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-dark to-dark/80 border border-white/10 group-hover:border-primary/50 transition-colors duration-300 mb-6">
                                    <div className="text-primary">
                                        {stat.icon}
                                    </div>
                                </div>
                                <h3 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 group-hover:from-primary group-hover:to-secondary transition-all">
                                    {stat.number}
                                </h3>
                                <p className="text-xl font-semibold mb-1">{stat.label}</p>
                                <p className="text-text-secondary">{stat.suffix}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-6">Why Choose TravelEase?</h2>
                    <p className="text-text-secondary text-lg">We're committed to making your travel experience exceptional</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="p-6 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-primary/30 transition-all duration-300 group">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-dark to-dark/80 border border-white/10 w-fit mb-6 group-hover:border-primary/30">
                                <div className="text-primary group-hover:scale-110 transition-transform">
                                    {benefit.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                            <p className="text-text-secondary">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-6">Travelers Love Us</h2>
                    <p className="text-text-secondary text-lg">See what our customers have to say about their experiences</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative h-64">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 p-8 glass-panel rounded-3xl border border-white/10 transition-all duration-500 ${
                                    index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                                }`}
                            >
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl font-bold">
                                            {testimonial.avatar}
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex items-center gap-1 mb-4 justify-center md:justify-start">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-xl italic mb-6">"{testimonial.content}"</p>
                                        <div>
                                            <p className="font-bold text-lg">{testimonial.name}</p>
                                            <p className="text-text-secondary">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all ${
                                    index === currentSlide ? 'bg-primary w-10' : 'bg-white/20'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="relative rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/10" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-48 translate-x-48" />
                    
                    <div className="relative z-10 py-16 px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready for Your <span className="text-primary">Next Adventure</span>?
                        </h2>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
                            Join thousands of travelers who trust us with their most memorable journeys.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button 
                                onClick={() => navigate('/register')} 
                                className="btn btn-primary btn-lg px-10 py-4 text-lg group"
                            >
                                Start Planning Now
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                            </button>
                            <button 
                                onClick={() => navigate('/contact')} 
                                className="btn btn-outline btn-lg px-10 py-4 text-lg"
                            >
                                Talk to Our Expert
                            </button>
                        </div>
                        <p className="text-text-secondary mt-8">
                            Need help? Call us at <span className="text-primary font-semibold">+92 300 123 4567</span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;