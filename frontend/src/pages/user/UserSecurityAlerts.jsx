import React from "react";
import "./UserPages.css";
import PageTransition from "../../components/PageTransition";

const UserSecurityAlerts = () => {
  return (
    <PageTransition>
      <div className="user-page">
        <h1>Security Alerts</h1>

        <div className="alert-card alert-warning">
          <h3>Re-authentication Triggered</h3>
          <p>Unusual typing behavior detected</p>
          <span>2 minutes ago</span>
        </div>

        <div className="alert-card alert-ok">
          <h3>Session Verified</h3>
          <p>Behavior matched stored profile</p>
          <span>Today</span>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserSecurityAlerts;
