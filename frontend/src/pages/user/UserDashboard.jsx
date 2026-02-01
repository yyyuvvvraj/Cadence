import React from "react";
import { useBehavioralAuth } from "../../contexts/BehavioralAuthContext";
import "./UserDashboard.css";
import PageTransition from "../../components/PageTransition";

const UserDashboard = () => {
  const { sessionTrustLevel } = useBehavioralAuth();

  return (
    <PageTransition>
      <div className="user-dashboard-strata">
        <div className="dashboard-grid">
          <aside className="left-column">
            <div className="profile-card info-card">
              <div className="avatar" aria-hidden>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="24"
                    height="24"
                    rx="6"
                    fill="rgba(255,255,255,0.02)"
                  />
                  <path
                    d="M12 12a3 3 0 100-6 3 3 0 000 6z"
                    fill="rgba(255,255,255,0.12)"
                  />
                </svg>
              </div>
              <div className="profile-meta">
                <div className="profile-name">You</div>
                <div className="profile-sub">Active session</div>
              </div>
            </div>

            <div className="trust-card info-card">
              <h3>Session Trust</h3>
              <div className="trust-meter">
                <div
                  className="trust-fill"
                  style={{
                    width: `${sessionTrustLevel === "Low" ? 28 : sessionTrustLevel === "Medium" ? 60 : 92}%`,
                  }}
                />
              </div>
              <div className="trust-label">{sessionTrustLevel ?? "High"}</div>
            </div>

            <div className="recent-card info-card">
              <h3>Recent Events</h3>
              <ul className="recent-list">
                <li>
                  Login — Chrome on Windows ·{" "}
                  <span className="badge success">Trusted</span>
                </li>
                <li>
                  Auth check — Mouse pattern OK ·{" "}
                  <span className="badge neutral">Info</span>
                </li>
                <li>
                  Re-auth triggered — Typing anomaly ·{" "}
                  <span className="badge warn">Review</span>
                </li>
              </ul>
            </div>
          </aside>

          <main className="right-column">
            <div className="page-header">
              <h1>System Status</h1>
              <div className="page-subtitle">
                Overview of your session and recent metrics
              </div>
            </div>

            <section className="kpi-cards">
              <div className="info-card">
                <h3>Trust Level</h3>
                <div className="info-value">{sessionTrustLevel ?? "High"}</div>
              </div>

              <div className="info-card">
                <h3>Behavior Monitoring</h3>
                <div className="info-value">Active</div>
              </div>

              <div className="info-card">
                <h3>Last Login</h3>
                <div className="info-value">Just Now</div>
              </div>

              <div className="info-card">
                <h3>Anomalies</h3>
                <div className="info-value">0 in 24h</div>
              </div>
            </section>

            <section className="graph-card info-card">
              <h3>Activity Graph</h3>
              <div className="graph-placeholder">(Graph placeholder)</div>
            </section>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserDashboard;
