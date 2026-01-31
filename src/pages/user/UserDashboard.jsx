import React, { useEffect } from 'react';
import { useBehavioralAuth } from '../../contexts/BehavioralAuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
    const { sessionTrustLevel } = useBehavioralAuth();

    return (
        <div className="user-dashboard-strata">
            {/* Background Engine */}
            <div className="background-engine">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="strata-line"
                        style={{
                            top: `${i * 10}%`,
                            animationDelay: `${i * 0.5}s`
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <main className="dashboard-preview">
                <div className="hero-text">
                    <h2>System</h2>
                    <h2>Secure</h2>
                </div>
            </main>

            {/* Dev Indicator */}
            {process.env.NODE_ENV === 'development' && (
                <div className="dev-indicator">
                    Trust Level: {sessionTrustLevel}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
