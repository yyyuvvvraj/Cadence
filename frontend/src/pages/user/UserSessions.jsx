import React from "react";
import "./UserPages.css";
import PageTransition from "../../components/PageTransition";

const UserSessions = () => {
  return (
    <PageTransition>
      <div className="user-page">
        <div className="page-header">
          <h1>Active Sessions</h1>
          <div className="page-subtitle">
            Manage your current and past session devices
          </div>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Current Session</h3>
            <div className="info-value">Chrome · Windows</div>
            <div className="badge success">Active</div>
          </div>

          <div className="info-card">
            <h3>Previous Session</h3>
            <div className="info-value">Chrome · Windows</div>
            <div className="badge neutral">Logged Out</div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserSessions;
