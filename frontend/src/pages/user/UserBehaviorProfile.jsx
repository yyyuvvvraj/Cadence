import React from "react";
import "./UserPages.css";
import PageTransition from "../../components/PageTransition";

const UserBehaviorProfile = () => {
  return (
    <PageTransition>
      <div className="user-page">
        <div className="page-header">
          <h1>Behavioral Profile</h1>
          <div className="page-subtitle">
            Your stored biometric patterns and model status
          </div>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Average Typing Speed</h3>
            <div className="info-value">220 ms / key</div>
          </div>

          <div className="info-card">
            <h3>Mouse Movement Style</h3>
            <div className="info-value">Linear · Consistent</div>
          </div>

          <div className="info-card">
            <h3>Session Duration</h3>
            <div className="info-value">45 minutes</div>
          </div>

          <div className="info-card">
            <h3>Model Status</h3>
            <div className="info-value">Trained</div>
          </div>
        </div>

        <p className="privacy-note">
          This behavioral data is used only for authentication and security
          verification.
        </p>
      </div>
    </PageTransition>
  );
};

export default UserBehaviorProfile;
