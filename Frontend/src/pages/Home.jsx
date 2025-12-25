import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Exotic Locations',
            description: 'Discover hidden gems and popular destinations around Pakistan.',
            icon: '🌍',
            link: '/locations'
        },
        {
            title: 'Luxury Hotels',
            description: 'Book the best stays with premium amenities and comfort.',
            icon: '🏨',
            link: '/hotels'
        },
        {
            title: 'Seamless Flights',
            description: 'Find and book flights with top-rated airlines effortlessly.',
            icon: '✈️',
            link: '/flights'
        }
    ];

    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="hero">
                <div className="hero-content">
                    <h1 className="hero-title animate-fade-in">
                        Your Journey <br />
                        <span>Starts Here</span>
                    </h1>
                    <p className="hero-subtitle animate-slide-up">
                        Explore breath-taking locations, book luxury hotels, and find the best flights.
                        We make your travel planning seamless and memorable.
                    </p>
                    <div className="hero-btns animate-slide-up">
                        <button onClick={() => navigate('/locations')} className="btn btn-primary btn-lg">Explore Now</button>
                        <button onClick={() => navigate('/register')} className="btn btn-outline btn-lg">Join Us</button>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="floating-card location-card">
                        <span>📍 Swat Valley</span>
                    </div>
                    <div className="floating-card hotel-card">
                        <span>⭐ 5 Star Luxury</span>
                    </div>
                    <div className="floating-card flight-card">
                        <span>✈️ Business Class</span>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-header">
                    <h2>Our Services</h2>
                    <p>Everything you need for your next adventure</p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card" onClick={() => navigate(feature.link)}>
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                            <span className="learn-more">Explore →</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stat-item">
                    <h3>50+</h3>
                    <p>Destinations</p>
                </div>
                <div className="stat-item">
                    <h3>200+</h3>
                    <p>Hotels</p>
                </div>
                <div className="stat-item">
                    <h3>10k+</h3>
                    <p>Happy Travelers</p>
                </div>
            </section>

            <style jsx>{`
                .home-container {
                    padding-bottom: 4rem;
                }

                .hero {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    min-height: 80vh;
                    padding: 4rem 2rem;
                    gap: 4rem;
                }

                .hero-content {
                    flex: 1;
                }

                .hero-title {
                    font-size: 4.5rem;
                    line-height: 1.1;
                    font-weight: 800;
                    margin-bottom: 2rem;
                    letter-spacing: -2px;
                }

                .hero-title span {
                    background: var(--gradient-primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-subtitle {
                    font-size: 1.25rem;
                    color: var(--text-secondary);
                    max-width: 600px;
                    margin-bottom: 3rem;
                    line-height: 1.6;
                }

                .hero-btns {
                    display: flex;
                    gap: 1.5rem;
                }

                .btn-lg {
                    padding: 1.25rem 2.5rem;
                    font-size: 1.1rem;
                    font-weight: 600;
                }

                .hero-visual {
                    flex: 1;
                    position: relative;
                    height: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .floating-card {
                    position: absolute;
                    background: var(--glass-bg);
                    backdrop-filter: blur(12px);
                    border: 1px solid var(--glass-border);
                    padding: 1rem 2rem;
                    border-radius: 1rem;
                    font-weight: 600;
                    box-shadow: var(--shadow-lg);
                    animation: float 6s ease-in-out infinite;
                }

                .location-card { top: 10%; right: 10%; animation-delay: 0s; }
                .hotel-card { bottom: 20%; left: 10%; animation-delay: 2s; }
                .flight-card { center; animation-delay: 4s; }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }

                .features-section {
                    padding: 6rem 2rem;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .section-header h2 {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .feature-card {
                    background: var(--bg-card);
                    padding: 3rem 2rem;
                    border-radius: 2rem;
                    border: 1px solid var(--glass-border);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .feature-card:hover {
                    transform: translateY(-10px);
                    border-color: var(--primary);
                    background: rgba(var(--primary-rgb), 0.05);
                }

                .feature-icon {
                    font-size: 3rem;
                    margin-bottom: 1.5rem;
                }

                .feature-card h3 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                }

                .feature-card p {
                    color: var(--text-secondary);
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .learn-more {
                    color: var(--primary);
                    font-weight: 600;
                }

                .stats-section {
                    display: flex;
                    justify-content: space-around;
                    padding: 4rem 2rem;
                    background: var(--bg-card);
                    border-top: 1px solid var(--glass-border);
                    border-bottom: 1px solid var(--glass-border);
                    margin-top: 4rem;
                }

                .stat-item text-align: center;
                .stat-item h3 {
                    font-size: 3rem;
                    background: var(--gradient-primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 0.5rem;
                }

                @media (max-width: 968px) {
                    .hero {
                        flex-direction: column;
                        text-align: center;
                        padding-top: 2rem;
                    }
                    .hero-title { font-size: 3rem; }
                    .hero-subtitle { margin: 0 auto 2rem; }
                    .hero-btns { justify-content: center; }
                    .hero-visual { display: none; }
                }
            `}</style>
        </div>
    );
};

export default Home;
