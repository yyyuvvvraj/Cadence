import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const BehavioralAuthContext = createContext();

export const useBehavioralAuth = () => {
    const context = useContext(BehavioralAuthContext);
    if (!context) {
        throw new Error('useBehavioralAuth must be used within BehavioralAuthProvider');
    }
    return context;
};

export const BehavioralAuthProvider = ({ children }) => {
    const [isTracking, setIsTracking] = useState(false);
    const [showReAuthModal, setShowReAuthModal] = useState(false);
    const [reAuthReason, setReAuthReason] = useState('');
    const [sessionTrustLevel, setSessionTrustLevel] = useState('high');
    const [lastActivityTime, setLastActivityTime] = useState(Date.now());

    const IDLE_TIMEOUT = 2 * 60 * 1000; // 2 minutes in milliseconds

    // Update last activity time on user interaction
    const updateActivity = useCallback(() => {
        setLastActivityTime(Date.now());
    }, []);

    // Start behavioral tracking (idle detection)
    const startTracking = useCallback(() => {
        if (isTracking) return;

        setIsTracking(true);
        setSessionTrustLevel('high');
        setLastActivityTime(Date.now());

        console.log('[Behavioral Auth] Idle tracking started');
    }, [isTracking]);

    // Stop behavioral tracking
    const stopTracking = useCallback(() => {
        if (!isTracking) return;

        setIsTracking(false);
        setSessionTrustLevel('high');

        console.log('[Behavioral Auth] Idle tracking stopped');
    }, [isTracking]);

    // Trigger re-authentication modal
    const triggerReAuthentication = useCallback((reason) => {
        setShowReAuthModal(true);
        setReAuthReason(reason);
        console.log('[Behavioral Auth] Re-authentication required:', reason);
    }, []);

    // Handle successful re-authentication
    const handleReAuthSuccess = useCallback(() => {
        setShowReAuthModal(false);
        setReAuthReason('');
        setSessionTrustLevel('high');
        setLastActivityTime(Date.now());

        console.log('[Behavioral Auth] Re-authentication successful');
    }, []);

    // Handle failed re-authentication
    const handleReAuthFailure = useCallback(() => {
        setShowReAuthModal(false);
        stopTracking();

        console.log('[Behavioral Auth] Re-authentication failed - logging out');

        // Trigger logout (will be handled by parent component)
        return 'logout';
    }, [stopTracking]);

    // Track navigation changes (updates activity)
    const trackNavigation = useCallback((route) => {
        if (isTracking) {
            updateActivity();
        }
    }, [isTracking, updateActivity]);

    // Check for idle timeout periodically
    useEffect(() => {
        if (!isTracking) return;

        const checkIdleInterval = setInterval(() => {
            const timeSinceLastActivity = Date.now() - lastActivityTime;

            if (timeSinceLastActivity >= IDLE_TIMEOUT) {
                triggerReAuthentication('User has been idle for 2 minutes. Please verify your identity.');
            }
        }, 10000); // Check every 10 seconds

        return () => clearInterval(checkIdleInterval);
    }, [isTracking, lastActivityTime, triggerReAuthentication]);

    // Listen for user activity events
    useEffect(() => {
        if (!isTracking) return;

        const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];

        activityEvents.forEach(event => {
            window.addEventListener(event, updateActivity);
        });

        return () => {
            activityEvents.forEach(event => {
                window.removeEventListener(event, updateActivity);
            });
        };
    }, [isTracking, updateActivity]);

    const value = {
        // State
        isTracking,
        sessionTrustLevel,
        showReAuthModal,
        reAuthReason,
        verificationScore: 100, // Always 100 since we're not doing behavioral scoring
        riskLevel: 'trusted', // Always trusted since we're only checking idle
        baselineProfile: null,
        anomalyHistory: [],
        consecutiveLowScores: 0,

        // Actions
        startTracking,
        stopTracking,
        trackNavigation,
        handleReAuthSuccess,
        handleReAuthFailure,
        verifyBehavior: () => null, // No-op for compatibility
        getDataSnapshot: () => ({}), // No-op for compatibility
        getBehavioralSignature: () => ({}), // No-op for compatibility
    };

    return (
        <BehavioralAuthContext.Provider value={value}>
            {children}
        </BehavioralAuthContext.Provider>
    );
};

export default BehavioralAuthContext;
