import React from "react";
import "./UserPages.css";
import PageTransition from "../../components/PageTransition";

const UserBehaviorLive = () => {
  return (
    <PageTransition>
      <div className="user-page">
        <div className="page-header">
          <h1>Live Behavioral Monitoring</h1>
          <div className="page-subtitle">
            Real-time insights into your active session
          </div>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Typing Speed</h3>
            <div className="info-value">235 ms / key</div>
          </div>

          <div className="info-card">
            <h3>Mouse Movement</h3>
            <div className="info-value">Normal Pattern</div>
          </div>

          <div className="info-card">
            <h3>Idle Time</h3>
            <div className="info-value">Low</div>
          </div>

          <div className="info-card status-ok">
            <h3>Anomaly Detection</h3>
            <div className="info-value">No Anomalies Detected</div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserBehaviorLive;
