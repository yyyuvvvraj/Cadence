import React, { useEffect, useState } from "react";
import "./UserSessions.css";
import PageTransition from "../../components/PageTransition";
import { useDarkMode } from "../../contexts/DarkModeContext";

const UserSessions = () => {
  const [currentSession, setCurrentSession] = useState({
    browser: "Unknown",
    os: "Unknown",
    ip: "Loading...",
    device: "Desktop"
  });

  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Detect Browser
    const userAgent = navigator.userAgent;
    let browser = "Unknown Browser";
    if (userAgent.indexOf("Firefox") > -1) browser = "Firefox";
    else if (userAgent.indexOf("SamsungBrowser") > -1) browser = "Samsung Internet";
    else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) browser = "Opera";
    else if (userAgent.indexOf("Trident") > -1) browser = "Internet Explorer";
    else if (userAgent.indexOf("Edge") > -1) browser = "Edge";
    else if (userAgent.indexOf("Chrome") > -1) browser = "Chrome";
    else if (userAgent.indexOf("Safari") > -1) browser = "Safari";

    // Detect OS
    let os = "Unknown OS";
    if (userAgent.indexOf("Win") !== -1) os = "Windows";
    else if (userAgent.indexOf("Mac") !== -1) os = "macOS";
    else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
    else if (userAgent.indexOf("Android") !== -1) os = "Android";
    else if (userAgent.indexOf("like Mac") !== -1) os = "iOS";

    // Simple Heuristic for IP (mocked as we can't reliably get public IP client-side without external service)
    // In a real app, this would come from the backend session object.
    const mockIp = "127.0.0.1 (Local)";

    setCurrentSession({
      browser,
      os,
      ip: mockIp,
      device: window.innerWidth < 768 ? "Mobile Device" : "Work Station"
    });

    // Quartz Nodes Animation
    const container = document.querySelector('.user-sessions-container');
    if (container) {
      for (let i = 0; i < 8; i++) {
        const node = document.createElement('div');
        node.className = 'quartz-node';
        node.style.top = Math.random() * 100 + 'vh';
        node.style.left = Math.random() * 100 + 'vw';
        node.style.opacity = Math.random() * 0.5;
        container.appendChild(node);

        node.animate([
          { transform: 'translateY(0) scale(1)', opacity: 0.2 },
          { transform: `translateY(${Math.random() * 40 - 20}px) scale(1.5)`, opacity: 0.6 },
          { transform: 'translateY(0) scale(1)', opacity: 0.2 }
        ], {
          duration: 3000 + Math.random() * 3000,
          iterations: Infinity
        });
      }
    }
  }, []);

  return (
    <PageTransition>
      <div className="user-sessions-container" data-theme={isDarkMode ? 'dark' : 'light'}>
        <div className="sessions-content-wrapper">
          <header className="sessions-header">
            <span className="mono reveal" style={{ animationDelay: "0.1s" }}>Security Terminal</span>
            <h1 className="reveal" style={{ animationDelay: "0.2s" }}>SESSIONS_</h1>
            <div className="filament reveal" style={{ animationDelay: "0.4s" }}></div>
          </header>

          <div className="section-label reveal" style={{ animationDelay: "0.5s" }}>
            <span className="mono">Current Active Instance</span>
            <span className="line"></span>
          </div>

          <div className="slab-grid">
            {/* Active Session */}
            <div className="slab active reveal" style={{ animationDelay: "0.6s" }}>
              <div className="session-info">
                <div className="device-name">{currentSession.device}</div>
                <div className="meta-data">
                  <span>Browser: <b>{currentSession.browser}</b></span>
                  <span>OS: <b>{currentSession.os}</b></span>
                </div>
              </div>
              <div className="action-zone">
                <div className="location">
                  <span className="city">Local Host</span>
                  <span className="ip">{currentSession.ip}</span>
                </div>
                <button className="terminate-btn">STAY_ACTIVE</button>
              </div>
            </div>
          </div>

          <div className="section-label reveal" style={{ animationDelay: "0.7s" }}>
            <span className="mono">Historic Resonances</span>
            <span className="line"></span>
          </div>

          <div className="slab-grid reveal" style={{ animationDelay: "0.8s" }}>
            {/* Empty State for Historic Sessions as per request to be "correct" */}
            <div className="empty-state">
              <span className="mono">No other active neural links detected.</span>
            </div>
          </div>

          <footer className="reveal" style={{ marginTop: "100px", textAlign: "center", animationDelay: "1.1s" }}>
            <button className="terminate-btn" style={{ borderColor: "var(--magma)", color: "var(--magma)", width: "100%", maxWidth: "400px", padding: "20px" }}>
              TERMINATE ALL OTHER SESSIONS
            </button>
          </footer>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserSessions;
