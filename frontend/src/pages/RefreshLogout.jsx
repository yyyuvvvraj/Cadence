import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login/Login.css"; // reuse your existing styles

const RefreshLogout = () => {
  const navigate = useNavigate();

  return (
    <div className="kinetic-login-container">
      <div className="kinetic-app-container">
        <section className="kinetic-brand-panel">
          <h1 className="kinetic-brand-title">
            Session
            <br />
            Ended
          </h1>
          <p style={{ marginTop: "20px", opacity: 0.8 }}>
            For security reasons, refreshing the page logs you out.
          </p>
        </section>

        <section className="kinetic-form-panel">
          <button
            className="kinetic-submit-btn"
            onClick={() => navigate("/login")}
          >
            Return to Login
          </button>
        </section>
      </div>
    </div>
  );
};

export default RefreshLogout;
