import React from "react";
import "./UserPages.css";
import PageTransition from "../../components/PageTransition";

const UserSecurityAlerts = () => {
  return (
    <PageTransition>
      <div className="user-page">
        <div className="page-header">
          <h1>Security Alerts</h1>
          <div className="page-subtitle">
            Monitoring and recent security events
          </div>
        </div>

        <div className="alert-card alert-warning">
          <div>
            <h3>Re-authentication Triggered</h3>
            <p>Unusual typing behavior detected</p>
          </div>
          <div className="alert-meta">
            <span className="badge warn">2 minutes ago</span>
          </div>
        </div>

        <div className="alert-card alert-ok">
          <div>
            <h3>Session Verified</h3>
            <p>Behavior matched stored profile</p>
          </div>
          <div className="alert-meta">
            <span className="badge success">Today</span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserSecurityAlerts;
