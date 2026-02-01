import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './index.css';

const UserProfileManagement = () => {
  const [username, setUsername] = useState('USER');
  const [userRole, setUserRole] = useState('User');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      console.log('Fetching user profile from API...');

      const response = await fetch('http://localhost:5000/api/profile', {
        credentials: 'include', // Important for sending cookies
      });

      console.log('API Response status:', response.status);
      console.log('API Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      console.log('Profile data received:', data);
      setUserData(data);
      setUsername(data.name?.toUpperCase() || 'USER');

      // Get role from localStorage as fallback
      const storedRole = localStorage.getItem('userRole') || 'user';
      setUserRole(storedRole === 'admin' ? 'Admin' : 'User');
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile data');

      // Fallback to localStorage
      const storedUsername = localStorage.getItem('username') || 'user';
      const storedRole = localStorage.getItem('userRole') || 'user';
      setUsername(storedUsername.toUpperCase());
      setUserRole(storedRole === 'admin' ? 'Admin' : 'User');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch('http://localhost:5000/api/profile/photo', {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      const data = await response.json();

      // Update local state with new avatar
      setUserData(prev => ({ ...prev, avatar: data.avatar }));
      setError(null);
    } catch (err) {
      console.error('Error uploading photo:', err);
      setError('Failed to upload photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };
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
              {loading ? (
                <div className="avatar-loading">
                  <div className="loading-spinner"></div>
                </div>
              ) : (
                <>
                  <img
                    src={userData?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"}
                    className="avatar-img"
                    alt="Profile"
                  />
                  <div className="avatar-upload-overlay">
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      style={{ display: 'none' }}
                      disabled={uploading}
                    />
                    <label htmlFor="photo-upload" className="upload-button">
                      {uploading ? 'Uploading...' : 'Change Photo'}
                    </label>
                  </div>
                </>
              )}
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

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
