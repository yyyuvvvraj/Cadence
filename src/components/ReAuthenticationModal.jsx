import React, { useState, useEffect } from 'react';
import './ReAuthenticationModal.css';

const ReAuthenticationModal = ({ isOpen, onSuccess, onFailure, reason }) => {
    const [password, setPassword] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [error, setError] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setPassword('');
            setError('');
            setTimeLeft(60);
            return;
        }

        // Countdown timer
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onFailure();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen, onFailure]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsVerifying(true);

        // Simulate verification (in real app, verify with backend)
        setTimeout(() => {
            if (password.length >= 6) {
                onSuccess();
            } else {
                setError('Invalid password. Please try again.');
                setIsVerifying(false);
            }
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="reauth-overlay">
            <div className="reauth-modal">
                {/* Topography overlay */}
                <div className="reauth-topography" />

                {/* Header */}
                <div className="reauth-header">
                    <div className="reauth-icon">
                        <svg viewBox="0 0 24 24" width="40" height="40">
                            <path
                                fill="currentColor"
                                d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
                            />
                        </svg>
                    </div>
                    <h2 className="reauth-title">Identity Verification Required</h2>
                    <p className="reauth-subtitle">Unusual behavior detected</p>
                </div>

                {/* Reason */}
                {reason && (
                    <div className="reauth-reason">
                        <span className="reason-icon">⚠</span>
                        <p>{reason}</p>
                    </div>
                )}

                {/* Timer */}
                <div className="reauth-timer">
                    <div className="timer-circle">
                        <svg viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="4"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#00f0ff"
                                strokeWidth="4"
                                strokeDasharray={`${(timeLeft / 60) * 283} 283`}
                                strokeLinecap="round"
                                transform="rotate(-90 50 50)"
                            />
                        </svg>
                        <span className="timer-text">{timeLeft}s</span>
                    </div>
                    <p className="timer-label">Time remaining</p>
                </div>

                {/* Form */}
                <form className="reauth-form" onSubmit={handleSubmit}>
                    <div className="reauth-input-group">
                        <label>Access Key</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isVerifying}
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="reauth-error">
                            <span>✕</span> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`reauth-submit ${isVerifying ? 'verifying' : ''}`}
                        disabled={isVerifying}
                    >
                        {isVerifying ? (
                            <>
                                <span className="spinner" />
                                Verifying...
                            </>
                        ) : (
                            'Verify Identity'
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="reauth-footer">
                    <p>Session will be terminated if verification fails</p>
                </div>
            </div>
        </div>
    );
};

export default ReAuthenticationModal;
