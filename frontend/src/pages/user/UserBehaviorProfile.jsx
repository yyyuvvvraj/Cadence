import React from "react";
import "./UserPages.css";
import PageTransition from "../../components/PageTransition";

const UserBehaviorProfile = () => {
  return (
    <PageTransition>
      <div className="user-page">
        <h1>Behavioral Profile</h1>

        <div className="info-grid">
          <div className="info-card">
            <h3>Average Typing Speed</h3>
            <p>220 ms / key</p>
          </div>

          <div className="info-card">
            <h3>Mouse Movement Style</h3>
            <p>Linear & Consistent</p>
          </div>

          <div className="info-card">
            <h3>Session Duration</h3>
            <p>45 minutes</p>
          </div>

          <div className="info-card">
            <h3>Model Status</h3>
            <p>Trained</p>
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
