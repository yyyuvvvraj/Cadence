import React, { useState, useEffect } from 'react';
import { useBehavioralAuth } from '../../contexts/BehavioralAuthContext';
import './AdminBehavioralMonitoring.css';

const AdminBehavioralMonitoring = () => {
    const { anomalyHistory } = useBehavioralAuth();

    // Mock active sessions data
    const [activeSessions, setActiveSessions] = useState([
        {
            id: 1,
            username: 'john.doe',
            email: 'john@example.com',
            score: 95,
            riskLevel: 'trusted',
            duration: '45m',
            lastActivity: '2 min ago',
            ipAddress: '192.168.1.100',
        },
        {
            id: 2,
            username: 'jane.smith',
            email: 'jane@example.com',
            score: 78,
            riskLevel: 'normal',
            duration: '1h 20m',
            lastActivity: '5 min ago',
            ipAddress: '192.168.1.101',
        },
        {
            id: 3,
            username: 'bob.wilson',
            email: 'bob@example.com',
            score: 45,
            riskLevel: 'anomaly',
            duration: '10m',
            lastActivity: 'Just now',
            ipAddress: '192.168.1.102',
        },
    ]);

    const [selectedSession, setSelectedSession] = useState(null);
    const [systemMetrics] = useState({
        totalSessions: 3,
        averageScore: 73,
        anomalyRate: 33,
        activeAlerts: 1,
    });

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSessions(prev =>
                prev.map(session => ({
                    ...session,
                    score: Math.max(0, Math.min(100, session.score + (Math.random() - 0.5) * 10)),
                }))
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getRiskColor = (risk) => {
        const colors = {
            trusted: '#00ff88',
            normal: '#ffd700',
            suspicious: '#ffa500',
            anomaly: '#ff4444',
        };
        return colors[risk] || '#8e8e8e';
    };

    const handleForceLogout = (sessionId) => {
        console.log('Force logout session:', sessionId);
        setActiveSessions(prev => prev.filter(s => s.id !== sessionId));
    };

    const handleLockAccount = (sessionId) => {
        console.log('Lock account for session:', sessionId);
    };

    return (
        <div className="admin-behavioral-monitoring">
            {/* Header */}
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Behavioral Monitoring</h1>
                    <p className="admin-subtitle">Real-time continuous authentication dashboard</p>
                </div>
                <div className="admin-status">
                    <span className="status-dot" />
                    System Active
                </div>
            </div>

            {/* System Metrics */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-icon">👥</div>
                    <div className="metric-value">{systemMetrics.totalSessions}</div>
                    <div className="metric-label">Active Sessions</div>
                </div>
                <div className="metric-card">
                    <div className="metric-icon">📊</div>
                    <div className="metric-value">{systemMetrics.averageScore}%</div>
                    <div className="metric-label">Avg Verification Score</div>
                </div>
                <div className="metric-card">
                    <div className="metric-icon">⚠️</div>
                    <div className="metric-value">{systemMetrics.anomalyRate}%</div>
                    <div className="metric-label">Anomaly Rate</div>
                </div>
                <div className="metric-card alert">
                    <div className="metric-icon">🚨</div>
                    <div className="metric-value">{systemMetrics.activeAlerts}</div>
                    <div className="metric-label">Active Alerts</div>
                </div>
            </div>

            {/* Active Sessions Table */}
            <div className="sessions-section">
                <h2 className="section-title">Active User Sessions</h2>
                <div className="sessions-table">
                    <div className="table-header">
                        <div>User</div>
                        <div>Score</div>
                        <div>Risk Level</div>
                        <div>Duration</div>
                        <div>Last Activity</div>
                        <div>Actions</div>
                    </div>
                    {activeSessions.map(session => (
                        <div
                            key={session.id}
                            className={`table-row ${selectedSession?.id === session.id ? 'selected' : ''}`}
                            onClick={() => setSelectedSession(session)}
                        >
                            <div className="user-cell">
                                <div className="user-avatar">{session.username[0].toUpperCase()}</div>
                                <div>
                                    <div className="user-name">{session.username}</div>
                                    <div className="user-email">{session.email}</div>
                                </div>
                            </div>
                            <div className="score-cell">
                                <div className="score-bar">
                                    <div
                                        className="score-fill"
                                        style={{
                                            width: `${session.score}%`,
                                            background: getRiskColor(session.riskLevel),
                                        }}
                                    />
                                </div>
                                <span className="score-value">{Math.round(session.score)}%</span>
                            </div>
                            <div className="risk-cell">
                                <span
                                    className="risk-badge"
                                    style={{ background: getRiskColor(session.riskLevel) }}
                                >
                                    {session.riskLevel}
                                </span>
                            </div>
                            <div>{session.duration}</div>
                            <div>{session.lastActivity}</div>
                            <div className="actions-cell">
                                <button
                                    className="action-btn danger"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleForceLogout(session.id);
                                    }}
                                >
                                    Logout
                                </button>
                                <button
                                    className="action-btn warning"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLockAccount(session.id);
                                    }}
                                >
                                    Lock
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Session Details Panel */}
            {selectedSession && (
                <div className="session-details">
                    <h2 className="section-title">Session Details - {selectedSession.username}</h2>
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="detail-label">IP Address</span>
                            <span className="detail-value">{selectedSession.ipAddress}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Session Duration</span>
                            <span className="detail-value">{selectedSession.duration}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Verification Score</span>
                            <span className="detail-value">{Math.round(selectedSession.score)}%</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Risk Level</span>
                            <span
                                className="detail-value"
                                style={{ color: getRiskColor(selectedSession.riskLevel) }}
                            >
                                {selectedSession.riskLevel.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Anomaly History */}
            {anomalyHistory.length > 0 && (
                <div className="anomaly-section">
                    <h2 className="section-title">Recent Anomalies</h2>
                    <div className="anomaly-list">
                        {anomalyHistory.slice(-5).reverse().map((anomaly, index) => (
                            <div key={index} className="anomaly-item">
                                <div className="anomaly-icon">⚠️</div>
                                <div className="anomaly-content">
                                    <div className="anomaly-reason">{anomaly.reason}</div>
                                    <div className="anomaly-meta">
                                        Score: {anomaly.score}% • Risk: {anomaly.riskLevel} • Urgency: {anomaly.urgency}
                                    </div>
                                </div>
                                <div className="anomaly-time">
                                    {new Date(anomaly.timestamp).toLocaleTimeString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBehavioralMonitoring;
