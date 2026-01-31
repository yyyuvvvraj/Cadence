import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBehavioralAuth } from '../contexts/BehavioralAuthContext';
import './StrataNavbar.css';

const StrataNavbar = () => {
    const navigate = useNavigate();
    const { stopTracking } = useBehavioralAuth();
    const [menuActive, setMenuActive] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('dashboard-theme') || 'dark';
    });

    const pages = [
        {
            id: '01',
            category: 'CORE',
            title: 'Main\nDashboard',
            description: 'Central authentication node with live metrics and security analytics.',
            path: '/authentication-dashboard'
        },
        {
            id: '02',
            category: 'STREAM',
            title: 'Real-Time\nMonitoring',
            description: 'Live signal feed of all global authentication events and pings.',
            path: '/real-time-monitoring'
        },
        {
            id: '03',
            category: 'INTEL',
            title: 'Behavioral\nAnalytics',
            description: 'Pattern recognition and deep user behavior insights mapping.',
            path: '/behavioral-analytics'
        },
        {
            id: '04',
            category: 'ENTRY',
            title: 'User\nEnrollment',
            description: 'DNA and Biometric mapping for new high-clearance entities.',
            path: '/user-enrollment-setup'
        },
        {
            id: '05',
            category: 'BREACH',
            title: 'Security\nReports',
            description: 'Investigation and management of detected security anomalies.',
            path: '/security-incident-reports'
        }
    ];

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && menuActive) {
                setMenuActive(false);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [menuActive]);

    const handleLogout = () => {
        stopTracking();
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/user-profile-management');
    };

    const handleNavigate = (path) => {
        setMenuActive(false);
        navigate(path);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('dashboard-theme', newTheme);
    };

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        return () => {
            document.body.removeAttribute('data-theme');
        };
    }, [theme]);

    return (
        <>
            {/* Top Navigation */}
            <nav className="strata-top-nav">
                <div className="strata-brand-zone">
                    <span className="strata-brand-name">Biometric_Auth</span>
                </div>

                <div className="strata-nav-actions">
                    <button className="strata-theme-toggle-btn" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                        {theme === 'dark' ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>
                    <button className="strata-profile-btn-nav" onClick={handleProfile} title="View Profile">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </button>
                    <button className="strata-logout-btn-nav" onClick={handleLogout}>
                        <span>LOGOUT</span>
                    </button>
                    <button className="strata-nav-trigger" onClick={() => setMenuActive(!menuActive)}>
                        <span className="strata-trigger-text">
                            {menuActive ? 'CLOSE_MENU' : 'MENU'}
                        </span>
                        <div className="strata-burger">
                            <div className="strata-burger-accent" />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Strata Menu Overlay */}
            <div className={`strata-menu-overlay ${menuActive ? 'active' : ''}`}>
                <button className="strata-logout-btn-overlay" onClick={() => setMenuActive(false)}>
                    Terminate Session [ESC]
                </button>

                {pages.map((page, index) => (
                    <div
                        key={index}
                        className="strata-menu-column"
                        onClick={() => handleNavigate(page.path)}
                    >
                        <div className="strata-menu-id">{page.id} {'// '}{page.category}</div>
                        <h3 className="strata-menu-title">
                            {page.title.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i === 0 && <br />}
                                </React.Fragment>
                            ))}
                        </h3>
                        <p className="strata-menu-desc">{page.description}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default StrataNavbar;
