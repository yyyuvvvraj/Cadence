import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Login from "./pages/Login/Login";
import AuthenticationDashboard from "./pages/authentication-dashboard";
import SecurityIncidentReports from "./pages/security-incident-reports";
import BehavioralAnalytics from "./pages/behavioral-analytics";
import UserProfileManagement from "./pages/user-profile-management";
import RealTimeMonitoring from "./pages/real-time-monitoring";
import UserEnrollmentSetup from "./pages/user-enrollment-setup";
import AdminBehavioralMonitoring from "./pages/admin/AdminBehavioralMonitoring";
import UserDashboard from "./pages/user/UserDashboard";
import BehavioralAuthWrapper from "./components/BehavioralAuthWrapper";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes (with behavioral tracking) */}
          <Route path="/dashboard" element={
            <BehavioralAuthWrapper>
              <AuthenticationDashboard />
            </BehavioralAuthWrapper>
          } />
          <Route
            path="/authentication-dashboard"
            element={
              <BehavioralAuthWrapper>
                <AuthenticationDashboard />
              </BehavioralAuthWrapper>
            }
          />
          <Route
            path="/security-incident-reports"
            element={
              <BehavioralAuthWrapper>
                <SecurityIncidentReports />
              </BehavioralAuthWrapper>
            }
          />
          <Route
            path="/behavioral-analytics"
            element={
              <BehavioralAuthWrapper>
                <BehavioralAnalytics />
              </BehavioralAuthWrapper>
            }
          />
          <Route
            path="/user-profile-management"
            element={
              <BehavioralAuthWrapper>
                <UserProfileManagement />
              </BehavioralAuthWrapper>
            }
          />
          <Route
            path="/real-time-monitoring"
            element={
              <BehavioralAuthWrapper>
                <RealTimeMonitoring />
              </BehavioralAuthWrapper>
            }
          />
          <Route
            path="/user-enrollment-setup"
            element={
              <BehavioralAuthWrapper>
                <UserEnrollmentSetup />
              </BehavioralAuthWrapper>
            }
          />

          {/* Behavioral Biometrics Routes */}
          <Route
            path="/admin/behavioral-monitoring"
            element={
              <BehavioralAuthWrapper userRole="admin">
                <AdminBehavioralMonitoring />
              </BehavioralAuthWrapper>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <BehavioralAuthWrapper userRole="user">
                <UserDashboard />
              </BehavioralAuthWrapper>
            }
          />

          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
