import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Hotel, Plane, ArrowRight, Star, Globe, Shield, Users } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Exotic Locations',
            description: 'Discover hidden gems and popular destinations around Pakistan.',
            icon: <MapPin className="w-8 h-8 text-primary" />,
            link: '/locations',
            delay: '0'
        },
        {
            title: 'Luxury Hotels',
            description: 'Book the best stays with premium amenities and comfort.',
            icon: <Hotel className="w-8 h-8 text-secondary" />,
            link: '/hotels',
            delay: '100'
        },
        {
            title: 'Seamless Flights',
            description: 'Find and book flights with top-rated airlines effortlessly.',
            icon: <Plane className="w-8 h-8 text-accent" />,
            link: '/flights',
            delay: '200'
        }
    ];

    const stats = [
        { number: '50+', label: 'Destinations', icon: <Globe className="w-5 h-5" /> },
        { number: '200+', label: 'Hotels', icon: <Hotel className="w-5 h-5" /> },
        { number: '10k+', label: 'Happy Travelers', icon: <Users className="w-5 h-5" /> },
    ];

    return (
        <div className="pb-20 overflow-hidden">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center pt-20 pb-32">
                {/* Background Decor */}
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] -z-10" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Explore the world with us
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            Your Journey <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                                Starts Here
                            </span>
                        </h1>

                        <p className="text-xl text-text-secondary max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            Explore breath-taking locations, book luxury hotels, and find the best flights.
                            We make your travel planning seamless and memorable.
                        </p>

                        <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                            <button onClick={() => navigate('/locations')} className="btn btn-primary btn-lg group">
                                Explore Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button onClick={() => navigate('/register')} className="btn btn-outline btn-lg">
                                Join Us
                            </button>
                        </div>

                        <div className="pt-8 flex items-center gap-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-dark bg-card flex items-center justify-center text-xs font-bold">
                                        UA
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-sm text-text-secondary">trusted by 10k+ travelers</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden lg:block h-[600px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />

                        {/* Floating Cards */}
                        <div className="absolute top-10 right-10 p-4 glass-panel flex items-center gap-4 animate-float" style={{ animationDelay: '0s' }}>
                            <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-text-secondary">Popular Destination</p>
                                <p className="font-bold">Swat Valley</p>
                            </div>
                        </div>

                        <div className="absolute bottom-20 left-10 p-4 glass-panel flex items-center gap-4 animate-float" style={{ animationDelay: '2s' }}>
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                                <Hotel className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-text-secondary">Luxury Stay</p>
                                <p className="font-bold">5 Star Hotels</p>
                            </div>
                        </div>

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 glass-panel flex items-center gap-4 animate-float" style={{ animationDelay: '4s' }}>
                            <div className="p-3 bg-violet-500/10 rounded-xl text-violet-500">
                                <Plane className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-text-secondary">Best Flights</p>
                                <p className="font-bold">Business Class</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
                    <p className="text-text-secondary text-lg">Everything you need for your next adventure, all in one place.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(feature.link)}
                            className="group p-8 rounded-3xl bg-card border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="mb-6 p-4 rounded-2xl bg-dark w-fit border border-white/10 group-hover:border-primary/50 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-text-secondary mb-6">{feature.description}</p>
                                <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                                    Explore <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="glass-panel p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent" />

                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-4 text-primary/80">
                                    {stat.icon}
                                </div>
                                <h3 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                    {stat.number}
                                </h3>
                                <p className="text-text-secondary font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

