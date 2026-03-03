import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/Navbar.css';



const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'EVENTS', path: '/events' },
        { name: 'PAST EVENTS', path: '/past-events' },
        { name: 'TEAM', path: '/team' },
        { name: 'CONTACT', path: '/contact' },
        { name: 'REGISTER', path: '/register' },
    ];

    return (
        <nav className="navbar">
            {/* Animated Particles */}
            <div className="nav-particles">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="particle"
                        animate={{
                            y: [-20, -40, -20],
                            x: [0, Math.random() * 20 - 10, 0],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                        style={{
                            left: `${15 + i * 12}%`,
                            top: '50%',
                        }}
                    />
                ))}
            </div>

            <div className="nav-main-wrapper">
                {/* Jims Logo - Left */}
                <Link to="/" className="nav-logo nav-logo-left">
                    <img src="/Logo/Jims_Logo.png" alt="JIMS Logo" className="logo-image jims-logo" />
                </Link>

                {/* Centered Navigation Container */}
                <div className="nav-container">
                    {/* Desktop Menu */}
                    <div className="nav-menu desktop">
                    {navLinks.map((link) => {
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                <span className="nav-item-text">{link.name}</span>
                                <motion.div
                                    className="nav-underline"
                                    layoutId="underline"
                                    initial={false}
                                    animate={{ opacity: location.pathname === link.path ? 1 : 0 }}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Right cluster: logos + mobile toggle */}
            <div className="nav-right-cluster">
                <div className="nav-logo-right-group">
                    <Link to="/" className="nav-logo">
                        <img src="/Logo/Enigma_Logo.svg" alt="Enigma Logo" className="logo-image enigma-logo" />
                    </Link>
                    <Link to="/" className="nav-logo">
                        <img src="/Logo/Buglsayers.png" alt="Bugslayers Logo" className="logo-image bugslayers-logo" />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div
                    className={`nav-toggle ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                </div>
            </div>
        </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-overlay"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {/* Close button inside overlay */}
                        <button
                            className="mobile-close-btn"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            &#x2715;
                        </button>

                        {/* Logos row at top of menu */}
                        <div className="mobile-menu-logos">
                            <img src="/Logo/Enigma_Logo.svg" alt="Enigma" className="mobile-menu-logo" />
                            <img src="/Logo/Buglsayers.png" alt="Bugslayers" className="mobile-menu-logo" />
                        </div>

                        <div className="mobile-menu">
                            {navLinks.map((link) => {
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="mobile-item"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
