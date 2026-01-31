import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import UserContextIndicator from "../../components/ui/UserContextIndicator";
import MetricCard from "./components/MetricCard";
import ThreatLevelIndicator from "./components/ThreatLevelIndicator";
import SessionTable from "./components/SessionTable";
import BehavioralVisualization from "./components/BehavioralVisualization";
import FilterPanel from "./components/FilterPanel";

const AuthenticationDashboard = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    department: "all",
    riskLevel: "all",
    timeRange: "today",
    authMethod: "all",
    resultCount: 12,
  });

  const [selectedUser, setSelectedUser] = useState(null);

  const mockSessions = [
    {
      id: 1,
      userName: "Sarah Johnson",
      userEmail: "sarah.johnson@company.com",
      department: "Engineering",
      confidenceScore: 94,
      riskLevel: "low",
      status: "active",
      timestamp: "2026-01-28 14:05:00",
    },
    {
      id: 2,
      userName: "Michael Chen",
      userEmail: "michael.chen@company.com",
      department: "Sales",
      confidenceScore: 67,
      riskLevel: "high",
      status: "suspicious",
      timestamp: "2026-01-28 13:58:00",
    },
    {
      id: 3,
      userName: "Emily Rodriguez",
      userEmail: "emily.rodriguez@company.com",
      department: "Marketing",
      confidenceScore: 88,
      riskLevel: "medium",
      status: "active",
      timestamp: "2026-01-28 13:45:00",
    },
    {
      id: 4,
      userName: "David Kim",
      userEmail: "david.kim@company.com",
      department: "Finance",
      confidenceScore: 92,
      riskLevel: "low",
      status: "active",
      timestamp: "2026-01-28 13:30:00",
    },
    {
      id: 5,
      userName: "Jessica Martinez",
      userEmail: "jessica.martinez@company.com",
      department: "HR",
      confidenceScore: 45,
      riskLevel: "critical",
      status: "suspicious",
      timestamp: "2026-01-28 13:15:00",
    },
    {
      id: 6,
      userName: "Robert Taylor",
      userEmail: "robert.taylor@company.com",
      department: "Engineering",
      confidenceScore: 89,
      riskLevel: "low",
      status: "active",
      timestamp: "2026-01-28 13:00:00",
    },
    {
      id: 7,
      userName: "Amanda White",
      userEmail: "amanda.white@company.com",
      department: "Sales",
      confidenceScore: 76,
      riskLevel: "medium",
      status: "active",
      timestamp: "2026-01-28 12:45:00",
    },
    {
      id: 8,
      userName: "James Anderson",
      userEmail: "james.anderson@company.com",
      department: "Marketing",
      confidenceScore: 91,
      riskLevel: "low",
      status: "active",
      timestamp: "2026-01-28 12:30:00",
    },
    {
      id: 9,
      userName: "Lisa Thompson",
      userEmail: "lisa.thompson@company.com",
      department: "Finance",
      confidenceScore: 58,
      riskLevel: "high",
      status: "suspicious",
      timestamp: "2026-01-28 12:15:00",
    },
    {
      id: 10,
      userName: "Christopher Lee",
      userEmail: "christopher.lee@company.com",
      department: "Engineering",
      confidenceScore: 95,
      riskLevel: "low",
      status: "active",
      timestamp: "2026-01-28 12:00:00",
    },
    {
      id: 11,
      userName: "Michelle Garcia",
      userEmail: "michelle.garcia@company.com",
      department: "HR",
      confidenceScore: 87,
      riskLevel: "low",
      status: "active",
      timestamp: "2026-01-28 11:45:00",
    },
    {
      id: 12,
      userName: "Daniel Brown",
      userEmail: "daniel.brown@company.com",
      department: "Sales",
      confidenceScore: 72,
      riskLevel: "medium",
      status: "active",
      timestamp: "2026-01-28 11:30:00",
    },
  ];

  const mockKeystrokeData = {
    avgSpeed: 68,
    consistency: 92,
    patternMatch: 94,
    timingDistribution: [45, 78, 92, 85, 67, 54, 43, 38],
    anomalies: [
      {
        description: "Unusual typing speed spike detected",
        timestamp: "14:03:15",
      },
      {
        description: "Rhythm pattern deviation from baseline",
        timestamp: "13:58:42",
      },
    ],
  };

  const mockMouseData = {
    avgSpeed: 245,
    clickAccuracy: 96,
    patternMatch: 91,
    heatmap: [
      12, 45, 67, 89, 78, 56, 34, 23, 34, 67, 89, 92, 87, 65, 45, 34, 45, 78,
      95, 98, 94, 76, 56, 45, 56, 87, 92, 89, 85, 67, 54, 43, 43, 65, 78, 76,
      72, 58, 45, 34, 32, 54, 67, 65, 61, 49, 38, 27,
    ],
    patterns: [
      { description: "Diagonal movement preference", frequency: 156 },
      { description: "Right-to-left scanning pattern", frequency: 89 },
      { description: "Circular mouse gestures", frequency: 45 },
    ],
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    console.log("Applying filters:", filters);
  };

  const handleResetFilters = () => {
    setFilters({
      department: "all",
      riskLevel: "all",
      timeRange: "today",
      authMethod: "all",
      resultCount: 12,
    });
  };

  const handleTerminateSession = (sessionId) => {
    console.log("Terminating session:", sessionId);
  };

  const handleInvestigate = (sessionId) => {
    navigate("/security-incident-reports");
  };

  const handleViewDetails = (sessionId) => {
    const session = mockSessions?.find((s) => s?.id === sessionId);
    if (session) {
      setSelectedUser({
        name: session?.userName,
        department: session?.department,
      });
    }
    navigate("/user-profile-management");
  };

  const handleViewProfile = () => {
    navigate("/user-profile-management");
  };

  const handleEditUser = () => {
    navigate("/user-enrollment-setup");
  };

  const handleViewActivity = () => {
    navigate("/real-time-monitoring");
  };

  const handleManageAccess = () => {
    navigate("/user-profile-management");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-500/5 via-background to-accent-500/5 pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="relative z-10">
        <main className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-6">
          <Breadcrumbs />

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold bg-gradient-to-r from-primary-500 via-accent-500 to-pink-500 bg-clip-text text-transparent mb-3">
              Authentication Dashboard
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Monitor real-time behavioral authentication and security events
              across your organization
            </p>
          </div>

          <div className="mb-8">
            <UserContextIndicator
              userName="Admin User"
              userEmail="admin@company.com"
              enrollmentStatus="active"
              lastActivity="2026-01-28 14:09:00"
              onViewProfile={handleViewProfile}
              onEditUser={handleEditUser}
              onViewActivity={handleViewActivity}
              onManageAccess={handleManageAccess}
            />
          </div>

          <div className="mb-8">
            <ThreatLevelIndicator
              level="low"
              description="All systems operating normally. No critical security threats detected in the last 24 hours."
              lastUpdated="2026-01-28 14:09:00"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-8">
            <MetricCard
              title="Active Sessions"
              value="247"
              change="+12.5%"
              changeType="positive"
              icon="Users"
              trend={[45, 52, 48, 65, 72, 68, 78, 85]}
            />
            <MetricCard
              title="Success Rate"
              value="96.8%"
              change="+2.3%"
              changeType="positive"
              icon="CheckCircle"
              trend={[85, 87, 89, 92, 94, 95, 96, 97]}
            />
            <MetricCard
              title="Suspicious Activity"
              value="3"
              change="-45.2%"
              changeType="positive"
              icon="AlertTriangle"
              iconColor="var(--color-warning)"
              trend={[12, 10, 8, 6, 5, 4, 3, 3]}
            />
            <MetricCard
              title="Avg Confidence"
              value="89.2%"
              change="+5.1%"
              changeType="positive"
              icon="TrendingUp"
              trend={[78, 80, 82, 85, 86, 87, 88, 89]}
            />
          </div>

          <div className="mb-8">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <SessionTable
                sessions={mockSessions}
                onTerminateSession={handleTerminateSession}
                onInvestigate={handleInvestigate}
                onViewDetails={handleViewDetails}
              />
            </div>

            <div className="lg:col-span-1">
              <BehavioralVisualization
                selectedUser={selectedUser}
                keystrokeData={mockKeystrokeData}
                mouseData={mockMouseData}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthenticationDashboard;
