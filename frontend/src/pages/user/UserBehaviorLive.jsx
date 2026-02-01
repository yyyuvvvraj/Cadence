import React from "react";
import "./UserPages.css";
import PageTransition from "../../components/PageTransition";

const UserBehaviorLive = () => {
  return (
    <PageTransition>
      <div className="user-page">
        <h1>Live Behavioral Monitoring</h1>

        <div className="info-grid">
          <div className="info-card">
            <h3>Typing Speed</h3>
            <p>235 ms / key</p>
          </div>

          <div className="info-card">
            <h3>Mouse Movement</h3>
            <p>Normal Pattern</p>
          </div>

          <div className="info-card">
            <h3>Idle Time</h3>
            <p>Low</p>
          </div>

          <div className="info-card status-ok">
            <h3>Anomaly Detection</h3>
            <p>No Anomalies Detected</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserBehaviorLive;
