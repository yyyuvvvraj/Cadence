import React from "react";
import "./UserPages.css";
import PageTransition from "../../components/PageTransition";

const UserSessions = () => {
  return (
    <PageTransition>
      <div className="user-page">
        <h1>Active Sessions</h1>

        <div className="info-card">
          <h3>Current Session</h3>
          <p>Chrome · Windows</p>
          <p>Status: Active</p>
        </div>

        <div className="info-card">
          <h3>Previous Session</h3>
          <p>Chrome · Windows</p>
          <p>Status: Logged Out</p>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserSessions;
