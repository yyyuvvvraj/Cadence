import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBehavioralAuth } from '../contexts/BehavioralAuthContext';
import ReAuthenticationModal from '../components/ReAuthenticationModal';

/**
 * Behavioral Auth Wrapper
 * Wraps protected routes to enable continuous authentication
 */
const BehavioralAuthWrapper = ({ children, userRole = 'user' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        isTracking,
        startTracking,
        stopTracking,
        trackNavigation,
        showReAuthModal,
        reAuthReason,
        handleReAuthSuccess,
        handleReAuthFailure,
    } = useBehavioralAuth();

    // Start tracking when component mounts
    useEffect(() => {
        if (!isTracking) {
            startTracking();
        }

        return () => {
            // Don't stop tracking on unmount (keep it running across routes)
        };
    }, [isTracking, startTracking]);

    // Track navigation changes
    useEffect(() => {
        trackNavigation(location.pathname);
    }, [location.pathname, trackNavigation]);

    // Handle re-auth failure (logout)
    const handleReAuthFail = () => {
        const result = handleReAuthFailure();
        if (result === 'logout') {
            stopTracking();
            navigate('/login');
        }
    };

    return (
        <>
            {children}

            {/* Re-authentication Modal */}
            <ReAuthenticationModal
                isOpen={showReAuthModal}
                onSuccess={handleReAuthSuccess}
                onFailure={handleReAuthFail}
                reason={reAuthReason}
            />
        </>
    );
};

export default BehavioralAuthWrapper;
