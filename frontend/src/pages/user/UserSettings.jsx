import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserPages.css";
import PageTransition from "../../components/PageTransition";
const UserSettings = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="user-page">
        <h1>User Settings & Privacy</h1>

        <div className="info-card">
          <h3>Behavioral Monitoring</h3>
          <p>Enabled</p>
        </div>

        <div className="info-card">
          <h3>Data Usage</h3>
          <p>Used only for authentication purposes</p>
        </div>

        <button className="danger-btn" onClick={() => navigate("/login")}>
          Logout
        </button>
      </div>
    </PageTransition>
  );
};

export default UserSettings;
