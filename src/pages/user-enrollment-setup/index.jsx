import React from 'react';
import './index.css';

const UserEnrollmentSetup = () => {
    return (
        <div className="user-enrollment-setup">
            <div className="page-header">
                <h1>User Enrollment Setup</h1>
                <p className="subtitle">DNA and Biometric mapping for new high-clearance entities</p>
            </div>

            <div className="enrollment-content">
                <div className="info-card">
                    <div className="card-icon">✨</div>
                    <h2>Enrollment System</h2>
                    <p>Configure and manage user enrollment processes for the behavioral biometrics authentication system.</p>
                </div>

                <div className="info-card">
                    <div className="card-icon">🔐</div>
                    <h2>Biometric Mapping</h2>
                    <p>Set up behavioral patterns and baseline profiles for new users entering the system.</p>
                </div>

                <div className="info-card">
                    <div className="card-icon">📊</div>
                    <h2>Profile Configuration</h2>
                    <p>Define security clearance levels and access permissions for enrolled users.</p>
                </div>
            </div>
        </div>
    );
};

export default UserEnrollmentSetup;
