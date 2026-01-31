import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import UserContextIndicator from "../../components/ui/UserContextIndicator";
import AlertNotificationPanel from "../../components/ui/AlertNotificationPanel";
import AnalyticsFilters from "./components/AnalyticsFilters";
import TrendChart from "./components/TrendChart";
import MetricsDataTable from "./components/MetricsDataTable";
import StatisticalSummary from "./components/StatisticalSummary";
import ComparisonTool from "./components/ComparisonTool";

const BehavioralAnalytics = () => {
  const navigate = useNavigate();

  const confidenceTrendData = [
    { timestamp: "00:00", keystroke: 92.5, mouse: 88.3, overall: 90.4 },
    { timestamp: "04:00", keystroke: 91.8, mouse: 89.1, overall: 90.5 },
    { timestamp: "08:00", keystroke: 93.2, mouse: 90.5, overall: 91.9 },
    { timestamp: "12:00", keystroke: 94.1, mouse: 91.8, overall: 93.0 },
    { timestamp: "16:00", keystroke: 92.9, mouse: 90.2, overall: 91.6 },
    { timestamp: "20:00", keystroke: 91.5, mouse: 88.9, overall: 90.2 },
  ];

  const patternConsistencyData = [
    { timestamp: "Mon", typing: 87.5, clicks: 85.2, scrolling: 89.1 },
    { timestamp: "Tue", typing: 89.2, clicks: 87.8, scrolling: 90.5 },
    { timestamp: "Wed", typing: 91.5, clicks: 89.5, scrolling: 92.3 },
    { timestamp: "Thu", typing: 90.8, clicks: 88.9, scrolling: 91.7 },
    { timestamp: "Fri", typing: 88.9, clicks: 86.5, scrolling: 89.8 },
    { timestamp: "Sat", typing: 85.3, clicks: 83.1, scrolling: 87.2 },
    { timestamp: "Sun", typing: 84.7, clicks: 82.5, scrolling: 86.8 },
  ];

  const anomalyDistributionData = [
    { timestamp: "Keystroke", count: 45, severity: 35 },
    { timestamp: "Mouse", count: 32, severity: 28 },
    { timestamp: "Timing", count: 28, severity: 22 },
    { timestamp: "Pattern", count: 19, severity: 15 },
    { timestamp: "Session", count: 15, severity: 12 },
  ];

  const userMetricsData = [
    {
      userId: "user001",
      userName: "John Doe",
      userEmail: "john.doe@company.com",
      typingRhythm: 92.5,
      mouseConsistency: 88.3,
      clickPattern: 90.7,
      sessionDuration: 45,
      confidenceScore: 91.2,
      anomalyCount: 3,
    },
    {
      userId: "user002",
      userName: "Sarah Smith",
      userEmail: "sarah.smith@company.com",
      typingRhythm: 95.2,
      mouseConsistency: 93.1,
      clickPattern: 94.5,
      sessionDuration: 52,
      confidenceScore: 94.8,
      anomalyCount: 1,
    },
    {
      userId: "user003",
      userName: "Michael Chen",
      userEmail: "michael.chen@company.com",
      typingRhythm: 87.8,
      mouseConsistency: 85.5,
      clickPattern: 86.9,
      sessionDuration: 38,
      confidenceScore: 87.2,
      anomalyCount: 5,
    },
    {
      userId: "user004",
      userName: "Emily Johnson",
      userEmail: "emily.johnson@company.com",
      typingRhythm: 91.3,
      mouseConsistency: 89.7,
      clickPattern: 92.1,
      sessionDuration: 48,
      confidenceScore: 91.8,
      anomalyCount: 2,
    },
    {
      userId: "user005",
      userName: "David Martinez",
      userEmail: "david.martinez@company.com",
      typingRhythm: 78.5,
      mouseConsistency: 75.2,
      clickPattern: 77.8,
      sessionDuration: 32,
      confidenceScore: 77.9,
      anomalyCount: 8,
    },
    {
      userId: "user006",
      userName: "Lisa Anderson",
      userEmail: "lisa.anderson@company.com",
      typingRhythm: 93.7,
      mouseConsistency: 91.5,
      clickPattern: 93.2,
      sessionDuration: 50,
      confidenceScore: 93.1,
      anomalyCount: 2,
    },
    {
      userId: "user007",
      userName: "Robert Taylor",
      userEmail: "robert.taylor@company.com",
      typingRhythm: 89.2,
      mouseConsistency: 87.8,
      clickPattern: 88.9,
      sessionDuration: 42,
      confidenceScore: 88.9,
      anomalyCount: 4,
    },
    {
      userId: "user008",
      userName: "Jennifer Wilson",
      userEmail: "jennifer.wilson@company.com",
      typingRhythm: 94.5,
      mouseConsistency: 92.8,
      clickPattern: 94.1,
      sessionDuration: 55,
      confidenceScore: 94.2,
      anomalyCount: 1,
    },
    {
      userId: "user009",
      userName: "James Brown",
      userEmail: "james.brown@company.com",
      typingRhythm: 85.3,
      mouseConsistency: 83.7,
      clickPattern: 84.9,
      sessionDuration: 36,
      confidenceScore: 85.1,
      anomalyCount: 6,
    },
    {
      userId: "user010",
      userName: "Maria Garcia",
      userEmail: "maria.garcia@company.com",
      typingRhythm: 90.8,
      mouseConsistency: 88.9,
      clickPattern: 91.3,
      sessionDuration: 47,
      confidenceScore: 90.7,
      anomalyCount: 3,
    },
    {
      userId: "user011",
      userName: "William Davis",
      userEmail: "william.davis@company.com",
      typingRhythm: 88.5,
      mouseConsistency: 86.2,
      clickPattern: 87.8,
      sessionDuration: 40,
      confidenceScore: 87.9,
      anomalyCount: 5,
    },
    {
      userId: "user012",
      userName: "Patricia Miller",
      userEmail: "patricia.miller@company.com",
      typingRhythm: 92.1,
      mouseConsistency: 90.5,
      clickPattern: 91.8,
      sessionDuration: 49,
      confidenceScore: 91.6,
      anomalyCount: 2,
    },
  ];

  const statisticsData = {
    avgConfidence: 91.2,
    confidenceChange: 2.5,
    patternAccuracy: 89.7,
    accuracyChange: 1.8,
    totalAnomalies: 139,
    anomalyChange: -5.2,
    activeUsers: 248,
    userChange: 3.1,
    correlations: [
      { label: "Keystroke vs Mouse Movement", value: 87.5 },
      { label: "Typing Speed vs Accuracy", value: 92.3 },
      { label: "Session Time vs Confidence", value: 78.9 },
      { label: "Click Pattern vs Navigation", value: 85.7 },
    ],
    modelMetrics: [
      { label: "Precision", value: 94.2, icon: "Target" },
      { label: "Recall", value: 91.8, icon: "Search" },
      { label: "F1 Score", value: 93.0, icon: "Award" },
      { label: "Accuracy", value: 95.5, icon: "CheckCircle" },
    ],
  };

  const handleFilterChange = (filters) => {
    console.log("Filters changed:", filters);
  };

  const handleExport = () => {
    console.log("Exporting data...");
  };

  const handleGenerateReport = () => {
    console.log("Generating report...");
  };

  const handleUserClick = (user) => {
    navigate("/user-profile-management", { state: { userId: user?.userId } });
  };

  const handleCompare = (comparisonData) => {
    console.log("Comparison data:", comparisonData);
  };

  const handleViewProfile = () => {
    navigate("/user-profile-management");
  };

  const handleEditUser = () => {
    console.log("Edit user clicked");
  };

  const handleViewActivity = () => {
    navigate("/real-time-monitoring");
  };

  const handleManageAccess = () => {
    console.log("Manage access clicked");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AlertNotificationPanel />

      <main className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Breadcrumbs />

        <div className="mb-6">
          <UserContextIndicator
            userName="John Doe"
            userEmail="john.doe@company.com"
            enrollmentStatus="active"
            lastActivity="2026-01-28 13:45:00"
            onViewProfile={handleViewProfile}
            onEditUser={handleEditUser}
            onViewActivity={handleViewActivity}
            onManageAccess={handleManageAccess}
          />
        </div>

        <div className="mb-6">
          <AnalyticsFilters
            onFilterChange={handleFilterChange}
            onExport={handleExport}
            onGenerateReport={handleGenerateReport}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TrendChart
            title="Authentication Confidence Trends"
            description="Real-time confidence scoring over 24 hours"
            data={confidenceTrendData}
            chartType="line"
            dataKeys={["keystroke", "mouse", "overall"]}
            colors={["#06B6D4", "#10B981", "#F59E0B"]}
            height={320}
          />

          <TrendChart
            title="Pattern Consistency Analysis"
            description="Weekly behavioral pattern stability"
            data={patternConsistencyData}
            chartType="area"
            dataKeys={["typing", "clicks", "scrolling"]}
            colors={["#06B6D4", "#10B981", "#8B5CF6"]}
            height={320}
          />
        </div>

        <div className="mb-6">
          <TrendChart
            title="Anomaly Distribution by Category"
            description="Detected anomalies and severity levels"
            data={anomalyDistributionData}
            chartType="bar"
            dataKeys={["count", "severity"]}
            colors={["#F59E0B", "#EF4444"]}
            height={280}
          />
        </div>

        <div className="mb-6">
          <MetricsDataTable
            data={userMetricsData}
            onUserClick={handleUserClick}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StatisticalSummary statistics={statisticsData} />
          </div>

          <div>
            <ComparisonTool onCompare={handleCompare} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BehavioralAnalytics;
