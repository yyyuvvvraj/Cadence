import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import UserContextIndicator from "../../components/ui/UserContextIndicator";
import LiveEventStream from "./components/LiveEventStream";
import MetricsDashboard from "./components/MetricsDashboard";
import BehavioralPatternCharts from "./components/BehavioralPatternCharts";
import FilterControls from "./components/FilterControls";
import QuickActions from "./components/QuickActions";
import AlertConfiguration from "./components/AlertConfiguration";
import Icon from "../../components/AppIcon";

const RealTimeMonitoring = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [filters, setFilters] = useState({
    searchQuery: "",
    severity: "all",
    department: "all",
    timeWindow: "last_15min",
    eventType: "all",
    resultCount: 127,
  });

  const mockMetrics = {
    activeSessions: 1847,
    sessionsChange: 12.5,
    avgConfidence: 87.3,
    confidenceChange: 3.2,
    activeThreats: 8,
    threatsChange: -15.8,
    eventsPerMin: 342,
    eventsChange: 8.7,
  };

  const mockEvents = [
    {
      id: 1,
      severity: "critical",
      type: "authentication_attempt",
      title: "Multiple Failed Authentication Attempts",
      description:
        "User exceeded maximum failed login attempts within 2-minute window. Account temporarily locked for security.",
      userName: "john.doe@company.com",
      eventType: "Failed Login",
      location: "New York, US",
      confidenceScore: 23,
      timestamp: "2026-01-28 14:08:00",
    },
    {
      id: 2,
      severity: "high",
      type: "anomaly_detected",
      title: "Unusual Behavioral Pattern Detected",
      description:
        "Typing pattern deviation exceeds 85% threshold. User behavior significantly differs from established baseline.",
      userName: "sarah.smith@company.com",
      eventType: "Anomaly Detection",
      location: "London, UK",
      confidenceScore: 42,
      timestamp: "2026-01-28 14:06:30",
    },
    {
      id: 3,
      severity: "high",
      type: "threshold_breach",
      title: "Confidence Score Below Threshold",
      description:
        "User confidence score dropped below 60% threshold during active session. Continuous monitoring activated.",
      userName: "michael.chen@company.com",
      eventType: "Threshold Breach",
      location: "Singapore, SG",
      confidenceScore: 58,
      timestamp: "2026-01-28 14:05:15",
    },
    {
      id: 4,
      severity: "medium",
      type: "confidence_change",
      title: "Confidence Score Fluctuation",
      description:
        "Rapid confidence score changes detected. User behavior showing inconsistent patterns over last 5 minutes.",
      userName: "emma.wilson@company.com",
      eventType: "Score Change",
      location: "Toronto, CA",
      confidenceScore: 71,
      timestamp: "2026-01-28 14:04:00",
    },
    {
      id: 5,
      severity: "medium",
      type: "pattern_deviation",
      title: "Mouse Movement Pattern Deviation",
      description:
        "Mouse movement velocity and acceleration patterns differ from user baseline by 68%.",
      userName: "david.kumar@company.com",
      eventType: "Pattern Change",
      location: "Mumbai, IN",
      confidenceScore: 74,
      timestamp: "2026-01-28 14:02:45",
    },
    {
      id: 6,
      severity: "low",
      type: "session_started",
      title: "New Session Initiated",
      description:
        "User successfully authenticated and started new session. All behavioral baselines within normal range.",
      userName: "lisa.anderson@company.com",
      eventType: "Session Start",
      location: "Sydney, AU",
      confidenceScore: 94,
      timestamp: "2026-01-28 14:01:20",
    },
    {
      id: 7,
      severity: "low",
      type: "session_ended",
      title: "Session Ended Normally",
      description:
        "User session terminated normally. Average confidence score maintained at 89% throughout session.",
      userName: "robert.taylor@company.com",
      eventType: "Session End",
      location: "Berlin, DE",
      confidenceScore: 89,
      timestamp: "2026-01-28 14:00:00",
    },
  ];

  const mockKeystrokeData = [
    { time: "14:00", dwellTime: 85, flightTime: 120 },
    { time: "14:02", dwellTime: 92, flightTime: 115 },
    { time: "14:04", dwellTime: 88, flightTime: 125 },
    { time: "14:06", dwellTime: 95, flightTime: 110 },
    { time: "14:08", dwellTime: 90, flightTime: 118 },
  ];

  const mockMouseData = [
    { interval: "0-2min", velocity: 450, acceleration: 85 },
    { interval: "2-4min", velocity: 520, acceleration: 92 },
    { interval: "4-6min", velocity: 480, acceleration: 88 },
    { interval: "6-8min", velocity: 510, acceleration: 90 },
    { interval: "8-10min", velocity: 495, acceleration: 87 },
  ];

  const mockSessionData = [
    { time: "14:00", confidence: 92, riskScore: 8 },
    { time: "14:02", confidence: 89, riskScore: 11 },
    { time: "14:04", confidence: 85, riskScore: 15 },
    { time: "14:06", confidence: 87, riskScore: 13 },
    { time: "14:08", confidence: 90, riskScore: 10 },
  ];

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        console.log("Auto-refreshing data...");
      }, refreshInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleFilterChange = (filterName, value) => {
    if (filterName === "reset") {
      setFilters({
        searchQuery: "",
        severity: "all",
        department: "all",
        timeWindow: "last_15min",
        eventType: "all",
        resultCount: 127,
      });
    } else {
      setFilters({ ...filters, [filterName]: value });
    }
  };

  const handleSearch = (query) => {
    setFilters({ ...filters, searchQuery: query });
  };

  const handleQuickAction = (actionId, event) => {
    console.log(`Action ${actionId} triggered for event:`, event);

    if (actionId === "investigate") {
      navigate("/security-incident-reports", { state: { event } });
    }
  };

  const handleSaveConfiguration = (config) => {
    console.log("Saving alert configuration:", config);
  };

  const handleViewProfile = () => {
    navigate("/user-profile-management");
  };

  const handleEditUser = () => {
    navigate("/user-enrollment-setup");
  };

  const handleViewActivity = () => {
    console.log("Viewing user activity...");
  };

  const handleManageAccess = () => {
    console.log("Managing user access...");
  };

  return (
    <>
      <Helmet>
        <title>Real Time Monitoring - BiometricAuth</title>
        <meta
          name="description"
          content="Live monitoring of behavioral authentication events and system performance across all active sessions"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <Breadcrumbs />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Real Time Monitoring
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Live visibility into behavioral authentication events and system
                performance
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth
                  ${autoRefresh
                    ? "bg-success/10 text-success"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }
                `}
              >
                <Icon name={autoRefresh ? "Play" : "Pause"} size={16} />
                <span>
                  {autoRefresh ? "Auto-refresh ON" : "Auto-refresh OFF"}
                </span>
              </button>

              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(parseInt(e?.target?.value))}
                className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                disabled={!autoRefresh}
              >
                <option value={5}>Every 5s</option>
                <option value={10}>Every 10s</option>
                <option value={30}>Every 30s</option>
                <option value={60}>Every 1m</option>
              </select>
            </div>
          </div>

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
            <MetricsDashboard metrics={mockMetrics} />
          </div>

          <div className="mb-6">
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <BehavioralPatternCharts
                keystrokeData={mockKeystrokeData}
                mouseData={mockMouseData}
                sessionData={mockSessionData}
              />
            </div>

            <div className="space-y-6">
              <QuickActions
                selectedEvent={selectedEvent}
                onAction={handleQuickAction}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Icon
                      name="Activity"
                      size={20}
                      color="var(--color-accent)"
                    />
                    <h3 className="text-lg font-semibold text-foreground">
                      Live Event Stream
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow" />
                    <span className="text-xs text-muted-foreground caption">
                      Live
                    </span>
                  </div>
                </div>

                <LiveEventStream
                  events={mockEvents}
                  onEventClick={handleEventClick}
                />
              </div>
            </div>

            <div>
              <AlertConfiguration onSave={handleSaveConfiguration} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RealTimeMonitoring;
