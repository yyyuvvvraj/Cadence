import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './index.css';

const UserProfileManagement = () => {
  const [username, setUsername] = useState('USER');
  const [userRole, setUserRole] = useState('User');

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('username') || 'user';
    const storedRole = localStorage.getItem('userRole') || 'user';

    setUsername(storedUsername.toUpperCase());
    setUserRole(storedRole === 'admin' ? 'Admin' : 'User');
  }, []);
  return (
    <>
      <Helmet>
        <title>Strata Profile // Tectonic Interface - BiometricAuth</title>
        <meta
          name="description"
          content="User profile management with tectonic grid interface and industrial design aesthetics"
        />
      </Helmet>

      <div className="tectonic-profile-page">
        <div className="noise"></div>

        <main className="tectonic-container">
          <header className="profile-hero">
            <div className="profile-id-group">
              <div className="profile-status">NETWORK ACTIVE // SYNCED</div>
              <h1 className="profile-name">{username}<br />STRATA_01</h1>
            </div>
            <div className="profile-meta-grid">
              <div className="meta-item">
                <div className="meta-label">Access Level</div>
                <div className="meta-value">Tier 04 / {userRole}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Node Origin</div>
                <div className="meta-value">Tokyo-OS_7</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Up-Time</div>
                <div className="meta-value">1,402 hrs</div>
              </div>
            </div>
          </header>

          <section className="tectonic-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">124</div>
                <div className="stat-title">Deployments</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">0.03s</div>
                <div className="stat-title">Avg Latency</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">99.9%</div>
                <div className="stat-title">Integrity</div>
              </div>
            </div>

            <div className="bio-section">
              <div className="tectonic-block">
                <span className="block-label">Manifesto_Data</span>
                <h3 className="bio-title">Interface Architect & System Designer</h3>
                <p className="bio-description">
                  Specializing in the intersection of brutalist industrial aesthetics and high-performance digital architectures. Currently building the next generation of Strata-core modules with a focus on tectonic grid systems and monospaced data visualization.
                </p>
                <div className="tech-tags">
                  <span className="tech-tag">RUST</span>
                  <span className="tech-tag">TYPESCRIPT</span>
                  <span className="tech-tag">STRATA_GL</span>
                  <span className="tech-tag">REACT</span>
                  <span className="tech-tag">NODE.JS</span>
                </div>
              </div>
            </div>
          </section>

          <aside className="tectonic-sidebar">
            <div className="avatar-container">
              <div className="block-label" style={{ zIndex: 2 }}>BIO_ID_SCAN</div>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                className="avatar-img"
                alt="Profile"
              />
            </div>

            <div className="tectonic-block" style={{ flexGrow: 1 }}>
              <span className="block-label">Live_Feed</span>
              <div className="activity-feed">
                <div className="activity-item">
                  <div className="activity-time">02:44:01</div>
                  <div className="activity-action">Commit to <span>strata-ui-core</span></div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">Yesterday</div>
                  <div className="activity-action">Rebuilt <span>nav-module.css</span></div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">03.12.24</div>
                  <div className="activity-action">System sync <span>@OS_7</span></div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">02.12.24</div>
                  <div className="activity-action">Auth pattern <span>verified</span></div>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
};

export default UserProfileManagement;
