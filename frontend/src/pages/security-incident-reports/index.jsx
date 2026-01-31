import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import UserContextIndicator from "../../components/ui/UserContextIndicator";
import IncidentSummaryCards from "./components/IncidentSummaryCards";
import IncidentFilters from "./components/IncidentFilters";
import IncidentTable from "./components/IncidentTable";
import IncidentDetailPanel from "./components/IncidentDetailPanel";
import Button from "../../components/ui/Button";
import "./index.css";

const SecurityIncidentReports = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedIncidents, setSelectedIncidents] = useState([]);
  const [savedPresets, setSavedPresets] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);

  const summaryData = {
    openCases: 23,
    openCasesChange: "+12%",
    openCasesTrend: "up",
    resolvedThreats: 156,
    resolvedThreatsChange: "+8%",
    resolvedThreatsTrend: "up",
    falsePositiveRate: 4.2,
    falsePositiveChange: "-1.3%",
    falsePositiveTrend: "down",
    avgResponseTime: "12m",
    avgResponseChange: "-3m",
    avgResponseTrend: "down",
  };

  const mockIncidents = [
    {
      id: 1,
      incidentId: "INC-2026-0428",
      timestamp: "2026-01-28 13:45:00",
      affectedUser: "John Doe",
      userEmail: "john.doe@company.com",
      severity: "critical",
      threatType: "Multiple Authentication Failures",
      detectionMethod: "Behavioral Analytics",
      status: "open",
      assignedTo: "",
      description: `Critical security incident detected involving multiple failed authentication attempts from user john.doe@company.com. The system identified 8 consecutive failed login attempts within a 3-minute window, significantly exceeding the normal baseline of 1-2 attempts per session.\n\nThe authentication failures occurred from IP address 192.168.1.105, which matches the user's typical location but shows unusual timing patterns. The attempts were made using correct username but incorrect passwords, suggesting potential credential compromise or brute force attack.\n\nBehavioral analysis indicates typing rhythm deviations of 87% from established baseline, mouse movement patterns inconsistent with user profile, and session timing anomalies. The incident triggered automatic account lockout after the 5th failed attempt, preventing further unauthorized access attempts.`,
      behavioralDeviations: [
        { metric: "Typing Rhythm", deviation: "87% deviation from baseline" },
        { metric: "Mouse Movement", deviation: "Pattern mismatch detected" },
        { metric: "Session Timing", deviation: "Unusual access time window" },
      ],
      affectedSystems: [
        "Authentication Service",
        "User Portal",
        "Session Manager",
      ],
      timeline: [
        {
          timestamp: "2026-01-28 13:45:00",
          action: "Incident Detected",
          description: "Multiple failed authentication attempts identified",
          icon: "AlertCircle",
          user: "System",
        },
        {
          timestamp: "2026-01-28 13:46:30",
          action: "Account Locked",
          description:
            "Automatic account lockout triggered after 5 failed attempts",
          icon: "Lock",
          user: "System",
        },
        {
          timestamp: "2026-01-28 13:48:00",
          action: "Alert Sent",
          description: "Security team notified via email and dashboard alert",
          icon: "Bell",
          user: "System",
        },
        {
          timestamp: "2026-01-28 14:05:00",
          action: "Investigation Started",
          description: "Security analyst assigned to investigate incident",
          icon: "Search",
          user: "sarah.analyst@company.com",
        },
      ],
      evidence: [
        {
          name: "authentication_logs.txt",
          type: "log",
          size: "2.4 MB",
          timestamp: "2026-01-28 13:45:00",
        },
        {
          name: "behavioral_analysis.json",
          type: "log",
          size: "156 KB",
          timestamp: "2026-01-28 13:46:00",
        },
        {
          name: "session_data.csv",
          type: "log",
          size: "892 KB",
          timestamp: "2026-01-28 13:47:00",
        },
      ],
      notes: [
        {
          author: "Sarah Analyst",
          timestamp: "2026-01-28 14:10:00",
          content:
            "Initial investigation shows IP address matches user location but timing is suspicious. Contacting user to verify legitimate access attempt.",
        },
      ],
    },
    {
      id: 2,
      incidentId: "INC-2026-0427",
      timestamp: "2026-01-28 12:30:00",
      affectedUser: "Sarah Smith",
      userEmail: "sarah.smith@company.com",
      severity: "high",
      threatType: "Behavioral Anomaly",
      detectionMethod: "ML Pattern Recognition",
      status: "investigating",
      assignedTo: "john.security@company.com",
      description: `High-severity behavioral anomaly detected in user sarah.smith@company.com's interaction patterns. The machine learning model identified significant deviations from established behavioral baseline across multiple metrics.\n\nKey anomalies include typing speed variations exceeding 75% of normal range, mouse movement patterns showing mechanical characteristics inconsistent with human behavior, and navigation sequences that deviate from typical user workflows. The session originated from a recognized device but exhibited unusual application access patterns.\n\nThe incident was flagged for investigation due to the combination of multiple anomaly indicators occurring simultaneously, suggesting potential account compromise or unauthorized access using legitimate credentials.`,
      behavioralDeviations: [
        { metric: "Typing Speed", deviation: "75% faster than baseline" },
        {
          metric: "Navigation Pattern",
          deviation: "Unusual workflow sequence",
        },
        {
          metric: "Application Access",
          deviation: "Atypical resource requests",
        },
      ],
      affectedSystems: ["User Portal", "Document Management", "Email System"],
      timeline: [
        {
          timestamp: "2026-01-28 12:30:00",
          action: "Anomaly Detected",
          description: "ML model identified behavioral pattern deviations",
          icon: "TrendingUp",
          user: "System",
        },
        {
          timestamp: "2026-01-28 12:32:00",
          action: "Risk Assessment",
          description: "Automated risk scoring calculated at 78/100",
          icon: "AlertTriangle",
          user: "System",
        },
        {
          timestamp: "2026-01-28 12:35:00",
          action: "Assigned for Review",
          description: "Incident assigned to security team for investigation",
          icon: "UserPlus",
          user: "john.security@company.com",
        },
      ],
      evidence: [
        {
          name: "behavioral_metrics.json",
          type: "log",
          size: "445 KB",
          timestamp: "2026-01-28 12:30:00",
        },
        {
          name: "ml_analysis_report.pdf",
          type: "log",
          size: "1.2 MB",
          timestamp: "2026-01-28 12:31:00",
        },
      ],
      notes: [
        {
          author: "John Security",
          timestamp: "2026-01-28 13:00:00",
          content:
            "Reviewing behavioral patterns. User confirmed legitimate access but mentioned using new keyboard which may explain typing variations.",
        },
      ],
    },
    {
      id: 3,
      incidentId: "INC-2026-0426",
      timestamp: "2026-01-28 11:15:00",
      affectedUser: "Michael Chen",
      userEmail: "michael.chen@company.com",
      severity: "medium",
      threatType: "Suspicious Activity",
      detectionMethod: "Access Pattern Analysis",
      status: "resolved",
      assignedTo: "sarah.analyst@company.com",
      description: `Medium-severity suspicious activity incident involving unusual access patterns from user michael.chen@company.com. The system detected access to sensitive resources outside normal working hours and from an unrecognized geographic location.\n\nThe user accessed financial reports and customer data repositories at 2:30 AM local time, which significantly deviates from their typical 9 AM - 6 PM access pattern. The session originated from a mobile device with valid authentication credentials but showed rapid sequential access to multiple restricted resources.\n\nInvestigation revealed the user was traveling for business and accessing systems from hotel WiFi, which triggered the geographic anomaly alert. User verification confirmed legitimate access, and the incident was resolved as false positive with updated travel notification protocols.`,
      behavioralDeviations: [
        { metric: "Access Time", deviation: "Outside normal working hours" },
        {
          metric: "Geographic Location",
          deviation: "Unrecognized IP address range",
        },
        {
          metric: "Resource Access",
          deviation: "Rapid sequential access pattern",
        },
      ],
      affectedSystems: [
        "Financial Reports",
        "Customer Database",
        "VPN Gateway",
      ],
      timeline: [
        {
          timestamp: "2026-01-28 11:15:00",
          action: "Suspicious Activity Detected",
          description: "Unusual access pattern identified by monitoring system",
          icon: "Eye",
          user: "System",
        },
        {
          timestamp: "2026-01-28 11:20:00",
          action: "User Contacted",
          description: "Automated verification email sent to user",
          icon: "Mail",
          user: "System",
        },
        {
          timestamp: "2026-01-28 11:45:00",
          action: "User Verified",
          description: "User confirmed legitimate business travel access",
          icon: "CheckCircle",
          user: "michael.chen@company.com",
        },
        {
          timestamp: "2026-01-28 12:00:00",
          action: "Incident Resolved",
          description: "Marked as false positive, travel notification updated",
          icon: "Check",
          user: "sarah.analyst@company.com",
        },
      ],
      evidence: [
        {
          name: "access_logs.txt",
          type: "log",
          size: "678 KB",
          timestamp: "2026-01-28 11:15:00",
        },
        {
          name: "user_verification.pdf",
          type: "log",
          size: "234 KB",
          timestamp: "2026-01-28 11:50:00",
        },
      ],
      notes: [
        {
          author: "Sarah Analyst",
          timestamp: "2026-01-28 12:00:00",
          content:
            "Incident resolved. User was on legitimate business travel. Updated travel notification system to prevent similar false positives.",
        },
      ],
    },
    {
      id: 4,
      incidentId: "INC-2026-0425",
      timestamp: "2026-01-28 10:00:00",
      affectedUser: "Emily Rodriguez",
      userEmail: "emily.rodriguez@company.com",
      severity: "high",
      threatType: "Unauthorized Access Attempt",
      detectionMethod: "Biometric Verification",
      status: "escalated",
      assignedTo: "mike.admin@company.com",
      description: `High-severity unauthorized access attempt detected for user emily.rodriguez@company.com. The system identified biometric verification failures combined with valid password authentication, indicating potential credential compromise.\n\nThe incident involved 3 consecutive fingerprint authentication failures followed by successful password login, suggesting an attacker may have obtained the user's password but lacks biometric credentials. The access attempt originated from a new device not previously associated with the user's account.\n\nDue to the severity and potential for credential compromise, the incident has been escalated to senior security team for immediate investigation. The user's account has been temporarily suspended pending verification, and all active sessions have been terminated.`,
      behavioralDeviations: [
        {
          metric: "Biometric Match",
          deviation: "Multiple fingerprint failures",
        },
        {
          metric: "Device Recognition",
          deviation: "Unregistered device detected",
        },
        {
          metric: "Access Location",
          deviation: "Geographic anomaly identified",
        },
      ],
      affectedSystems: [
        "Authentication Service",
        "Biometric Verification",
        "User Portal",
      ],
      timeline: [
        {
          timestamp: "2026-01-28 10:00:00",
          action: "Access Attempt Detected",
          description: "Biometric verification failures with valid password",
          icon: "Fingerprint",
          user: "System",
        },
        {
          timestamp: "2026-01-28 10:02:00",
          action: "Account Suspended",
          description: "Automatic account suspension triggered",
          icon: "ShieldOff",
          user: "System",
        },
        {
          timestamp: "2026-01-28 10:05:00",
          action: "Incident Escalated",
          description: "Escalated to senior security team for investigation",
          icon: "AlertTriangle",
          user: "System",
        },
        {
          timestamp: "2026-01-28 10:15:00",
          action: "Investigation Assigned",
          description: "Senior security administrator assigned to case",
          icon: "UserPlus",
          user: "mike.admin@company.com",
        },
      ],
      evidence: [
        {
          name: "biometric_logs.txt",
          type: "log",
          size: "1.8 MB",
          timestamp: "2026-01-28 10:00:00",
        },
        {
          name: "device_fingerprint.json",
          type: "log",
          size: "567 KB",
          timestamp: "2026-01-28 10:01:00",
        },
        {
          name: "session_analysis.csv",
          type: "log",
          size: "923 KB",
          timestamp: "2026-01-28 10:03:00",
        },
      ],
      notes: [
        {
          author: "Mike Admin",
          timestamp: "2026-01-28 10:20:00",
          content:
            "High priority investigation. Contacting user immediately to verify account status and initiate password reset protocol.",
        },
      ],
    },
    {
      id: 5,
      incidentId: "INC-2026-0424",
      timestamp: "2026-01-28 09:30:00",
      affectedUser: "David Wilson",
      userEmail: "david.wilson@company.com",
      severity: "low",
      threatType: "Policy Violation",
      detectionMethod: "Compliance Monitor",
      status: "resolved",
      assignedTo: "john.security@company.com",
      description: `Low-severity policy violation incident involving user david.wilson@company.com attempting to access restricted resources without proper authorization level. The compliance monitoring system detected access attempts to confidential financial documents that exceed the user's assigned permission level.\n\nThe incident appears to be unintentional, as the user was following a shared link from a colleague without realizing the resource was restricted. The system correctly blocked the access attempt and logged the violation for review.\n\nInvestigation confirmed no malicious intent, and the incident was resolved with user education on proper resource access protocols. The sharing user was also notified about appropriate document sharing practices.`,
      behavioralDeviations: [
        {
          metric: "Permission Level",
          deviation: "Access attempt above authorization",
        },
        { metric: "Resource Type", deviation: "Restricted document access" },
      ],
      affectedSystems: ["Document Management", "Access Control"],
      timeline: [
        {
          timestamp: "2026-01-28 09:30:00",
          action: "Policy Violation Detected",
          description: "Unauthorized resource access attempt blocked",
          icon: "ShieldAlert",
          user: "System",
        },
        {
          timestamp: "2026-01-28 09:35:00",
          action: "User Notified",
          description: "Automated notification sent to user",
          icon: "Mail",
          user: "System",
        },
        {
          timestamp: "2026-01-28 09:50:00",
          action: "Investigation Complete",
          description: "Confirmed unintentional violation, user educated",
          icon: "CheckCircle",
          user: "john.security@company.com",
        },
        {
          timestamp: "2026-01-28 10:00:00",
          action: "Incident Closed",
          description: "Resolved with no further action required",
          icon: "Check",
          user: "john.security@company.com",
        },
      ],
      evidence: [
        {
          name: "access_attempt_log.txt",
          type: "log",
          size: "234 KB",
          timestamp: "2026-01-28 09:30:00",
        },
      ],
      notes: [
        {
          author: "John Security",
          timestamp: "2026-01-28 10:00:00",
          content:
            "Incident resolved. User was unaware of document restrictions. Provided training on proper access protocols.",
        },
      ],
    },
    {
      id: 6,
      incidentId: "INC-2026-0423",
      timestamp: "2026-01-28 08:45:00",
      affectedUser: "Lisa Anderson",
      userEmail: "lisa.anderson@company.com",
      severity: "medium",
      threatType: "Session Anomaly",
      detectionMethod: "Session Monitor",
      status: "false_positive",
      assignedTo: "sarah.analyst@company.com",
      description: `Medium-severity session anomaly detected for user lisa.anderson@company.com involving unusual session duration and activity patterns. The monitoring system identified a session lasting 14 hours with intermittent activity, significantly exceeding the typical 4-6 hour session duration.\n\nThe extended session showed periods of high activity followed by long idle times, which triggered the anomaly detection algorithm. The session maintained valid authentication throughout but exhibited unusual interaction patterns.\n\nInvestigation revealed the user was working on a critical project deadline and legitimately maintained an extended work session. The incident was classified as false positive, and the user's work pattern was documented for future baseline adjustments.`,
      behavioralDeviations: [
        {
          metric: "Session Duration",
          deviation: "14 hours vs 4-6 hour baseline",
        },
        {
          metric: "Activity Pattern",
          deviation: "Intermittent high/low activity cycles",
        },
      ],
      affectedSystems: ["Session Manager", "User Portal"],
      timeline: [
        {
          timestamp: "2026-01-28 08:45:00",
          action: "Session Anomaly Detected",
          description: "Extended session duration flagged by monitoring system",
          icon: "Clock",
          user: "System",
        },
        {
          timestamp: "2026-01-28 09:00:00",
          action: "User Contacted",
          description: "Verification request sent to user",
          icon: "MessageSquare",
          user: "System",
        },
        {
          timestamp: "2026-01-28 09:15:00",
          action: "User Verified",
          description: "User confirmed legitimate extended work session",
          icon: "CheckCircle",
          user: "lisa.anderson@company.com",
        },
        {
          timestamp: "2026-01-28 09:30:00",
          action: "Marked False Positive",
          description:
            "Incident classified as false positive, baseline updated",
          icon: "XCircle",
          user: "sarah.analyst@company.com",
        },
      ],
      evidence: [
        {
          name: "session_activity_log.txt",
          type: "log",
          size: "1.5 MB",
          timestamp: "2026-01-28 08:45:00",
        },
      ],
      notes: [
        {
          author: "Sarah Analyst",
          timestamp: "2026-01-28 09:30:00",
          content:
            "False positive. User working on project deadline. Updated behavioral baseline to account for occasional extended sessions.",
        },
      ],
    },
  ];

  useEffect(() => {
    setFilteredIncidents(mockIncidents);
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...mockIncidents];

    if (filters?.searchQuery) {
      const query = filters?.searchQuery?.toLowerCase();
      filtered = filtered?.filter(
        (incident) =>
          incident?.incidentId?.toLowerCase()?.includes(query) ||
          incident?.affectedUser?.toLowerCase()?.includes(query) ||
          incident?.description?.toLowerCase()?.includes(query),
      );
    }

    if (filters?.threatType) {
      filtered = filtered?.filter(
        (incident) => incident?.threatType === filters?.threatType,
      );
    }

    if (filters?.severity) {
      filtered = filtered?.filter(
        (incident) => incident?.severity === filters?.severity,
      );
    }

    if (filters?.status) {
      filtered = filtered?.filter(
        (incident) => incident?.status === filters?.status,
      );
    }

    if (filters?.dateFrom) {
      filtered = filtered?.filter(
        (incident) =>
          new Date(incident.timestamp) >= new Date(filters.dateFrom),
      );
    }

    if (filters?.dateTo) {
      filtered = filtered?.filter(
        (incident) => new Date(incident.timestamp) <= new Date(filters.dateTo),
      );
    }

    setFilteredIncidents(filtered);
  };

  const handleSavePreset = (name, filters) => {
    setSavedPresets([...savedPresets, { name, filters }]);
  };

  const handleIncidentSelect = (incident) => {
    setSelectedIncident(incident);
  };

  const handleBulkAction = (action, incidentIds) => {
    switch (action) {
      case "selectAll":
        setSelectedIncidents(incidentIds);
        break;
      case "deselectAll":
        setSelectedIncidents([]);
        break;
      case "select":
        setSelectedIncidents(incidentIds);
        break;
      case "deselect":
        setSelectedIncidents(incidentIds);
        break;
      case "assign":
        console.log("Assigning incidents:", incidentIds);
        break;
      case "resolve":
        console.log("Resolving incidents:", incidentIds);
        break;
      case "export":
        console.log("Exporting incidents:", incidentIds);
        break;
      default:
        break;
    }
  };

  const handleSort = (field, direction) => {
    const sorted = [...filteredIncidents]?.sort((a, b) => {
      let aVal = a?.[field];
      let bVal = b?.[field];

      if (field === "timestamp") {
        aVal = new Date(aVal)?.getTime();
        bVal = new Date(bVal)?.getTime();
      }

      if (direction === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredIncidents(sorted);
  };

  const handleUpdateStatus = (incidentId, status) => {
    console.log("Updating incident status:", incidentId, status);
  };

  const handleAssign = (incidentId, assignee) => {
    console.log("Assigning incident:", incidentId, assignee);
  };

  const handleAddNote = (incidentId, note) => {
    console.log("Adding note to incident:", incidentId, note);
  };

  return (
    <div className="security-incident-reports min-h-screen">
      <main className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <Breadcrumbs />

        <div className="flex flex-col lg:flex-row items-start gap-6 mb-6 md:mb-8">
          <div className="flex-1 w-full lg:w-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-2">
              Security Incident Reports
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Comprehensive documentation and analysis of authentication
              anomalies and security events
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <UserContextIndicator
              userName="Security Administrator"
              userEmail="admin@company.com"
              enrollmentStatus="active"
              lastActivity="2026-01-28 14:05:00"
              onViewProfile={() => console.log("View profile")}
              onEditUser={() => console.log("Edit user")}
              onViewActivity={() => console.log("View activity")}
              onManageAccess={() => console.log("Manage access")}
            />
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          <IncidentSummaryCards summaryData={summaryData} />

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                Incident Management
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" iconName="Download">
                  Export Report
                </Button>
                <Button variant="default" iconName="Plus">
                  Create Incident
                </Button>
              </div>
            </div>

            <IncidentFilters
              onFilterChange={handleFilterChange}
              onSavePreset={handleSavePreset}
              savedPresets={savedPresets}
            />

            <IncidentTable
              incidents={filteredIncidents}
              onIncidentSelect={handleIncidentSelect}
              onBulkAction={handleBulkAction}
              selectedIncidents={selectedIncidents}
              onSort={handleSort}
            />
          </div>
        </div>
      </main>

      {selectedIncident && (
        <IncidentDetailPanel
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
          onUpdateStatus={handleUpdateStatus}
          onAssign={handleAssign}
          onAddNote={handleAddNote}
        />
      )}
    </div>
  );
};

export default SecurityIncidentReports;
