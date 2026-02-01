import React from "react";
import { useBehavioralAuth } from "../../contexts/BehavioralAuthContext";
import "./UserDashboard.css";
import PageTransition from "../../components/PageTransition";

const UserDashboard = () => {
  const { sessionTrustLevel } = useBehavioralAuth();

  return (
    <PageTransition>
      <div className="user-dashboard-strata">
        <div className="dashboard-preview">
          <h1>System Status</h1>
          <h2>Secure</h2>

          <div className="dashboard-cards">
            <div className="dash-card">
              <h3>Trust Level</h3>
              <p>{sessionTrustLevel ?? "High"}</p>
            </div>

            <div className="dash-card">
              <h3>Behavior Monitoring</h3>
              <p>Active</p>
            </div>

            <div className="dash-card">
              <h3>Last Login</h3>
              <p>Just Now</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserDashboard;
