import React from "react";
import "./UserPages.css";
import PageTransition from "../../components/PageTransition";

const UserAuthHistory = () => {
  return (
    <PageTransition>
      <div className="user-page">
        <h1>Authentication History</h1>

        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Method</th>
              <th>Device</th>
              <th>Trust Level</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Now</td>
              <td>Google OAuth</td>
              <td>Chrome · Windows</td>
              <td>High</td>
              <td>Success</td>
            </tr>
            <tr>
              <td>Yesterday</td>
              <td>GitHub OAuth</td>
              <td>Chrome · Windows</td>
              <td>Medium</td>
              <td>Success</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageTransition>
  );
};

export default UserAuthHistory;
