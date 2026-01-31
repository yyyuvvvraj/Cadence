import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Hardcoded credentials for demo
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123",
  };

  const USER_CREDENTIALS = {
    username: "user",
    password: "user123",
  };

  // Optimized cursor tracking with throttling
  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setCursorPos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Check credentials and route accordingly
    if (
      formData.username === ADMIN_CREDENTIALS.username &&
      formData.password === ADMIN_CREDENTIALS.password
    ) {
      // Admin login
      navigate("/admin/behavioral-monitoring");
    } else if (
      formData.username === USER_CREDENTIALS.username &&
      formData.password === USER_CREDENTIALS.password
    ) {
      // User login
      navigate("/user/dashboard");
    } else {
      // Invalid credentials
      setError("Invalid credentials. Try admin/admin123 or user/user123");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOAuthLogin = (provider) => {
    if (provider === "Google") {
      window.location.href = "https://cadencebackend.onrender.com/auth/google";
    }

    if (provider === "GitHub") {
      window.location.href = "https://cadencebackend.onrender.com/auth/github";
    }
  };

  return (
    <div className="kinetic-login-container">
      {/* Optimized Custom Cursor */}
      <div
        className="custom-cursor"
        style={{
          transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
        }}
      />
      <div
        className="custom-cursor-dot"
        style={{
          transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
        }}
      />

      {/* Mercury Background */}
      <div className="mercury-canvas">
        <div className="mercury-blob blob-1" />
        <div className="mercury-blob blob-2" />
        <div className="mercury-blob blob-3" />
      </div>

      {/* Gooey Filter */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ display: "none" }}
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="15"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Main Container */}
      <main className="kinetic-app-container">
        <div className="topography-overlay" />

        {/* Left Panel: Branding */}
        <section className="kinetic-brand-panel">
          <div className="brand-meta">
            System: Active
            <br />
            Node: 0xFF-782
          </div>

          <div>
            <h1 className="kinetic-brand-title">
              Biometric
              <br />
              Auth
            </h1>
          </div>

          <div className="brand-footer">
            <div className="brand-meta">
              <span className="status-dot" />
              Identity Encryption Layer 4
            </div>
          </div>
        </section>

        {/* Right Panel: Forms */}
        <section className="kinetic-form-panel">
          <nav className="form-toggle">
            <button
              className={`toggle-btn ${!isRegisterMode ? "active" : ""}`}
              onClick={() => setIsRegisterMode(false)}
            >
              Login
            </button>
            <button
              className={`toggle-btn ${isRegisterMode ? "active" : ""}`}
              onClick={() => setIsRegisterMode(true)}
            >
              Register
            </button>
          </nav>

          {/* Login Form */}
          {!isRegisterMode ? (
            <form className="kinetic-auth-form" onSubmit={handleSubmit}>
              <div className="kinetic-input-group">
                <label>Identity String</label>
                <input
                  type="text"
                  name="username"
                  placeholder="USER_ID"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="kinetic-input-group">
                <label>Access Key</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="login-error">
                  <span className="error-icon">✕</span>
                  <span>{error}</span>
                </div>
              )}

              <button className="kinetic-submit-btn" type="submit">
                Access Node
              </button>

              <div className="oauth-divider">
                <span>OR AUTHENTICATE VIA</span>
              </div>

              <div className="oauth-buttons">
                <button
                  type="button"
                  className="oauth-btn"
                  onClick={() => handleOAuthLogin("Google")}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="oauth-btn"
                  onClick={() => handleOAuthLogin("GitHub")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </div>
            </form>
          ) : (
            <form className="kinetic-auth-form" onSubmit={handleSubmit}>
              <div className="kinetic-input-group">
                <label>Preferred Handle</label>
                <input
                  type="text"
                  name="username"
                  placeholder="NEW_USER"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="kinetic-input-group">
                <label>Communication Protocol</label>
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL_ADDR"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="kinetic-input-group">
                <label>Access Key</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button className="kinetic-submit-btn" type="submit">
                Register DNA
              </button>

              <div className="oauth-divider">
                <span>OR REGISTER VIA</span>
              </div>

              <div className="oauth-buttons">
                <button
                  type="button"
                  className="oauth-btn"
                  onClick={() => handleOAuthLogin("Google")}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="oauth-btn"
                  onClick={() => handleOAuthLogin("GitHub")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
};

export default Login;
