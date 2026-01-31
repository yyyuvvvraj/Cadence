import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import UserContextIndicator from "../../components/ui/UserContextIndicator";
import AlertNotificationPanel from "../../components/ui/AlertNotificationPanel";
import UserInfoCard from "./components/UserInfoCard";
import BehavioralPatternsCard from "./components/BehavioralPatternsCard";
import AuthenticationTimeline from "./components/AuthenticationTimeline";
import DeviceAssociationsCard from "./components/DeviceAssociationsCard";
import AdminControlsCard from "./components/AdminControlsCard";
import PatternComparisonCard from "./components/PatternComparisonCard";

const UserProfileManagement = () => {
  const [userData] = useState({
    name: "Sarah Mitchell",
    email: "sarah.mitchell@techcorp.com",
    avatar:
      "https://img.rocket.new/generatedImages/rocket_gen_img_1479bf0bf-1763297239550.png",
    avatarAlt:
      "Professional headshot of woman with shoulder-length brown hair wearing navy blue blazer and white blouse",
    status: "active",
    enrolledDate: "Jan 15, 2025",
    lastActive: "2 mins ago",
    deviceCount: 4,
    authScore: 94,
  });

  const [behavioralPatterns] = useState({
    keystroke: {
      confidence: 94,
      deviation: 6,
      sampleCount: 1247,
      lastUpdated: "2 mins ago",
      characteristics: [
        { label: "Typing Speed", value: "68 WPM (avg)" },
        { label: "Key Hold Time", value: "142ms (avg)" },
        { label: "Flight Time", value: "89ms (avg)" },
        { label: "Error Rate", value: "2.3%" },
      ],

      analysisNote:
        "Keystroke patterns show consistent rhythm with minimal deviation. User demonstrates stable typing behavior across all sessions.",
    },
    mouse: {
      confidence: 89,
      deviation: 11,
      sampleCount: 3421,
      lastUpdated: "5 mins ago",
      characteristics: [
        { label: "Movement Speed", value: "Medium (avg)" },
        { label: "Click Precision", value: "High" },
        { label: "Scroll Pattern", value: "Smooth" },
        { label: "Gesture Style", value: "Deliberate" },
      ],

      analysisNote:
        "Mouse movement patterns indicate careful, deliberate interactions with occasional speed variations during multitasking.",
    },
    touch: {
      confidence: 91,
      deviation: 9,
      sampleCount: 892,
      lastUpdated: "15 mins ago",
      characteristics: [
        { label: "Tap Pressure", value: "Medium" },
        { label: "Swipe Speed", value: "Fast" },
        { label: "Gesture Accuracy", value: "High" },
        { label: "Multi-touch Usage", value: "Frequent" },
      ],

      analysisNote:
        "Touch gestures show confident, rapid interactions with high accuracy. User frequently employs multi-touch gestures.",
    },
    scroll: {
      confidence: 87,
      deviation: 13,
      sampleCount: 2156,
      lastUpdated: "8 mins ago",
      characteristics: [
        { label: "Scroll Speed", value: "Variable" },
        { label: "Direction Changes", value: "Moderate" },
        { label: "Pause Frequency", value: "High" },
        { label: "Momentum Usage", value: "Occasional" },
      ],

      analysisNote:
        "Scroll behavior shows reading-focused patterns with frequent pauses, indicating thorough content consumption.",
    },
  });

  const [timelineEvents] = useState([
    {
      id: 1,
      type: "success",
      title: "Successful Authentication",
      description: "User authenticated via behavioral biometrics",
      timestamp: "2026-01-28 14:09:00",
      location: "San Francisco, CA",
      device: "MacBook Pro",
      details: {
        ipAddress: "192.168.1.45",
        browser: "Chrome 120.0",
        authMethod: "Behavioral Biometrics",
        confidenceScore: 94,
        notes: "All behavioral patterns matched baseline with high confidence.",
      },
    },
    {
      id: 2,
      type: "warning",
      title: "Unusual Pattern Detected",
      description: "Typing speed deviation exceeded threshold",
      timestamp: "2026-01-28 11:23:00",
      location: "San Francisco, CA",
      device: "MacBook Pro",
      details: {
        ipAddress: "192.168.1.45",
        browser: "Chrome 120.0",
        authMethod: "Behavioral Biometrics + MFA",
        confidenceScore: 78,
        notes:
          "User was prompted for additional verification due to typing speed anomaly. Successfully completed MFA challenge.",
      },
    },
    {
      id: 3,
      type: "success",
      title: "New Device Enrolled",
      description: "iPhone 15 Pro successfully registered",
      timestamp: "2026-01-27 16:45:00",
      location: "San Francisco, CA",
      device: "iPhone 15 Pro",
      details: {
        ipAddress: "192.168.1.78",
        browser: "Safari 17.2",
        authMethod: "Device Enrollment",
        confidenceScore: 100,
        notes:
          "Device enrollment completed successfully. Initial behavioral baseline collection in progress.",
      },
    },
    {
      id: 4,
      type: "info",
      title: "Baseline Update",
      description: "Behavioral baseline automatically updated",
      timestamp: "2026-01-26 09:15:00",
      location: "San Francisco, CA",
      device: "MacBook Pro",
      details: {
        ipAddress: "192.168.1.45",
        browser: "Chrome 120.0",
        authMethod: "System Update",
        confidenceScore: 95,
        notes:
          "Scheduled baseline update completed. New patterns incorporated from 500+ recent sessions.",
      },
    },
    {
      id: 5,
      type: "failed",
      title: "Authentication Failed",
      description: "Multiple behavioral pattern mismatches",
      timestamp: "2026-01-25 14:30:00",
      location: "Unknown",
      device: "Windows Desktop",
      details: {
        ipAddress: "203.45.67.89",
        browser: "Firefox 121.0",
        authMethod: "Behavioral Biometrics",
        confidenceScore: 42,
        notes:
          "Authentication attempt from unrecognized device with significantly different behavioral patterns. Access denied and security alert triggered.",
      },
    },
  ]);

  const [devices] = useState([
    {
      id: 1,
      name: "MacBook Pro 16-inch",
      type: "laptop",
      browser: "Chrome 120.0",
      os: "macOS Sonoma 14.2",
      status: "active",
      addedDate: "Jan 15, 2025",
      lastUsed: "2 mins ago",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      type: "mobile",
      browser: "Safari 17.2",
      os: "iOS 17.2",
      status: "active",
      addedDate: "Jan 27, 2026",
      lastUsed: "1 hour ago",
      location: "San Francisco, CA",
    },
    {
      id: 3,
      name: "iPad Air",
      type: "tablet",
      browser: "Safari 17.2",
      os: "iPadOS 17.2",
      status: "active",
      addedDate: "Jan 20, 2026",
      lastUsed: "3 hours ago",
      location: "San Francisco, CA",
    },
    {
      id: 4,
      name: "Work Desktop",
      type: "desktop",
      browser: "Edge 120.0",
      os: "Windows 11",
      status: "inactive",
      addedDate: "Jan 15, 2025",
      lastUsed: "2 days ago",
      location: "San Francisco, CA",
    },
  ]);

  const [comparisonData] = useState({
    overall: {
      matchPercentage: 94,
      similarities: 47,
      deviations: 3,
      findings: [
        {
          type: "positive",
          text: "Keystroke dynamics match baseline with 96% accuracy",
        },
        {
          type: "positive",
          text: "Mouse movement patterns consistent across sessions",
        },
        {
          type: "negative",
          text: "Slight increase in typing speed during afternoon sessions",
        },
      ],

      recommendation:
        "Current behavioral patterns are well within acceptable parameters. Continue monitoring for any significant deviations.",
    },
    keystroke: {
      matchPercentage: 96,
      similarities: 52,
      deviations: 2,
      findings: [
        {
          type: "positive",
          text: "Key hold times match baseline within 5ms variance",
        },
        {
          type: "positive",
          text: "Flight times show consistent rhythm patterns",
        },
        {
          type: "positive",
          text: "Error correction behavior matches historical data",
        },
      ],

      recommendation:
        "Keystroke patterns are highly consistent. No action required.",
    },
    mouse: {
      matchPercentage: 89,
      similarities: 43,
      deviations: 5,
      findings: [
        {
          type: "positive",
          text: "Click precision remains high across all sessions",
        },
        {
          type: "negative",
          text: "Movement speed varies more than baseline during multitasking",
        },
        {
          type: "positive",
          text: "Scroll patterns maintain consistent rhythm",
        },
      ],

      recommendation:
        "Minor variations in mouse speed are within normal range for multitasking scenarios. Continue monitoring.",
    },
    timing: {
      matchPercentage: 91,
      similarities: 45,
      deviations: 4,
      findings: [
        {
          type: "positive",
          text: "Session timing patterns match work schedule baseline",
        },
        {
          type: "positive",
          text: "Break intervals consistent with historical behavior",
        },
        {
          type: "negative",
          text: "Occasional late-night activity outside normal patterns",
        },
      ],

      recommendation:
        "Timing patterns are generally consistent. Late-night activity may indicate legitimate overtime work.",
    },
  });

  const handleAdminAction = (actionId) => {
    console.log("Admin action triggered:", actionId);
  };

  const handleViewProfile = () => {
    console.log("View profile clicked");
  };

  const handleEditUser = () => {
    console.log("Edit user clicked");
  };

  const handleViewActivity = () => {
    console.log("View activity clicked");
  };

  const handleManageAccess = () => {
    console.log("Manage access clicked");
  };

  return (
    <>
      <Helmet>
        <title>User Profile Management - BiometricAuth</title>
        <meta
          name="description"
          content="Manage individual user behavioral authentication profiles with detailed pattern analysis and account control capabilities"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <AlertNotificationPanel />

        <main className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <Breadcrumbs />

          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
              User Profile Management
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Comprehensive user behavioral authentication profile and
              administrative controls
            </p>
          </div>

          <div className="mb-6">
            <UserContextIndicator
              userName={userData?.name}
              userEmail={userData?.email}
              enrollmentStatus={userData?.status}
              lastActivity="2026-01-28 14:09:00"
              onViewProfile={handleViewProfile}
              onEditUser={handleEditUser}
              onViewActivity={handleViewActivity}
              onManageAccess={handleManageAccess}
            />
          </div>

          <div className="space-y-6 md:space-y-8">
            <UserInfoCard user={userData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <BehavioralPatternsCard patterns={behavioralPatterns} />
              <PatternComparisonCard comparisonData={comparisonData} />
            </div>

            <AuthenticationTimeline events={timelineEvents} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <DeviceAssociationsCard devices={devices} />
              <AdminControlsCard onAction={handleAdminAction} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserProfileManagement;
