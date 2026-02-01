import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserPages.css";
import PageTransition from "../../components/PageTransition";
const UserSettings = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="user-page">
        <div className="page-header">
          <h1>User Settings & Privacy</h1>
          <div className="page-subtitle">
            Control what behavioral data we collect
          </div>
        </div>

        <div className="info-card">
          <h3>Behavioral Monitoring</h3>
          <div className="info-value">Enabled</div>
        </div>

        <div className="info-card">
          <h3>Data Usage</h3>
          <div className="info-value">
            Used only for authentication purposes
          </div>
        </div>

        <button className="danger-btn" onClick={() => navigate("/login")}>
          Logout
        </button>
      </div>
    </PageTransition>
  );
};

export default UserSettings;
