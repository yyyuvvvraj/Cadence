import React from "react";
import "./UserPages.css";
import PageTransition from "../../components/PageTransition";

const UserAuthHistory = () => {
  return (
    <PageTransition>
      <div className="user-page">
        <div className="page-header">
          <h1>Authentication History</h1>
          <div className="page-subtitle">
            Recent sign-ins and their trust indicators
          </div>
        </div>

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
              <td>
                <span className="badge success">High</span>
              </td>
              <td>
                <span className="badge success">Success</span>
              </td>
            </tr>
            <tr>
              <td>Yesterday</td>
              <td>GitHub OAuth</td>
              <td>Chrome · Windows</td>
              <td>
                <span className="badge neutral">Medium</span>
              </td>
              <td>
                <span className="badge success">Success</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageTransition>
  );
};

export default UserAuthHistory;
