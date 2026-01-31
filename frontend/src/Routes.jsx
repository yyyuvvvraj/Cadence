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
import AppLayout from "./components/AppLayout";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes (with behavioral tracking and navbar) */}
          <Route path="/dashboard" element={
            <BehavioralAuthWrapper>
              <AppLayout>
                <AuthenticationDashboard />
              </AppLayout>
            </BehavioralAuthWrapper>
          } />
          <Route
            path="/authentication-dashboard"
            element={
              <BehavioralAuthWrapper>
                <AppLayout>
                  <AuthenticationDashboard />
                </AppLayout>
              </BehavioralAuthWrapper>
            }
          />
          <Route
            path="/security-incident-reports"
            element={
              <BehavioralAuthWrapper>
                <AppLayout>
                  <SecurityIncidentReports />
                </AppLayout>
              </BehavioralAuthWrapper>
            }
          />
          <Route
            path="/behavioral-analytics"
            element={
              <BehavioralAuthWrapper>
                <AppLayout>
                  <BehavioralAnalytics />
                </AppLayout>
              </BehavioralAuthWrapper>
            }
          />
          <Route
            path="/user-profile-management"
            element={
              <BehavioralAuthWrapper>
                <AppLayout>
                  <UserProfileManagement />
                </AppLayout>
              </BehavioralAuthWrapper>
            }
          />
          <Route
            path="/real-time-monitoring"
            element={
              <BehavioralAuthWrapper>
                <AppLayout>
                  <RealTimeMonitoring />
                </AppLayout>
              </BehavioralAuthWrapper>
            }
          />
          <Route
            path="/user-enrollment-setup"
            element={
              <BehavioralAuthWrapper>
                <AppLayout>
                  <UserEnrollmentSetup />
                </AppLayout>
              </BehavioralAuthWrapper>
            }
          />

          {/* Behavioral Biometrics Routes */}
          <Route
            path="/admin/behavioral-monitoring"
            element={
              <BehavioralAuthWrapper userRole="admin">
                <AppLayout>
                  <AdminBehavioralMonitoring />
                </AppLayout>
              </BehavioralAuthWrapper>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <BehavioralAuthWrapper userRole="user">
                <AppLayout>
                  <UserDashboard />
                </AppLayout>
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
