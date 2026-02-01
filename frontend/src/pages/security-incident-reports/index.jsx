import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import "./index.css";

const SecurityIncidentReports = () => {
  // eslint-disable-next-line no-unused-vars
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const summaryData = {
    totalIncidents: 23,
    totalChange: "+12%",
    totalTrend: "up",
    openCases: 8,
    openChange: "+3",
    openTrend: "up",
    resolvedCases: 12,
    resolvedChange: "+5",
    resolvedTrend: "up",
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
      description: `Critical security incident detected involving multiple failed authentication attempts from user john.doe@company.com. The system identified 8 consecutive failed login attempts within a 3-minute window.`,
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
      description: `High-severity behavioral anomaly detected in user sarah.smith@company.com's interaction patterns. The machine learning model identified significant deviations from established behavioral baseline.`,
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
      description: `Medium-severity suspicious activity incident involving unusual access patterns from user michael.chen@company.com. The system detected access to sensitive resources outside normal working hours.`,
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
      description: `High-severity unauthorized access attempt detected for user emily.rodriguez@company.com. The system identified biometric verification failures combined with valid password authentication.`,
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
      description: `Low-severity policy violation incident involving user david.wilson@company.com attempting to access restricted resources without proper authorization level.`,
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
      description: `Medium-severity session anomaly detected for user lisa.anderson@company.com involving unusual session duration and activity patterns. The monitoring system identified a session lasting 14 hours.`,
    },
  ];

  useEffect(() => {
    let filtered = [...mockIncidents];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (incident) =>
          incident.incidentId.toLowerCase().includes(query) ||
          incident.affectedUser.toLowerCase().includes(query) ||
          incident.description.toLowerCase().includes(query)
      );
    }

    if (severityFilter !== "all") {
      filtered = filtered.filter((incident) => incident.severity === severityFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((incident) => incident.status === statusFilter);
    }

    setFilteredIncidents(filtered);
  }, [searchQuery, severityFilter, statusFilter, mockIncidents]);

  return (
    <>
      <Helmet>
        <title>Security Incidents // Tectonic Interface - BiometricAuth</title>
        <meta
          name="description"
          content="Security incident reports and threat analysis with tectonic grid interface"
        />
      </Helmet>

      <div className="tectonic-incidents-page">
        <div className="noise"></div>

        <main className="tectonic-container">
          <header className="incidents-hero">
            <div className="incidents-id-group">
              <div className="incidents-status">MONITORING ACTIVE // THREAT DETECTION</div>
              <h1 className="incidents-title">SECURITY<br />INCIDENTS</h1>
            </div>
            <div className="incidents-meta-grid">
              <div className="meta-item">
                <div className="meta-label">Total Incidents</div>
                <div className="meta-value">{summaryData.totalIncidents}</div>
                <div className={`meta-change ${summaryData.totalTrend}`}>
                  {summaryData.totalChange}
                </div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Open Cases</div>
                <div className="meta-value">{summaryData.openCases}</div>
                <div className={`meta-change ${summaryData.openTrend}`}>
                  {summaryData.openChange}
                </div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Resolved</div>
                <div className="meta-value">{summaryData.resolvedCases}</div>
                <div className={`meta-change ${summaryData.resolvedTrend}`}>
                  {summaryData.resolvedChange}
                </div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Avg Response</div>
                <div className="meta-value">{summaryData.avgResponseTime}</div>
                <div className={`meta-change ${summaryData.avgResponseTrend}`}>
                  {summaryData.avgResponseChange}
                </div>
              </div>
            </div>
          </header>

          <section className="tectonic-content">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="SEARCH INCIDENTS // ID, USER, DESCRIPTION..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value" style={{ color: 'var(--accent-red)' }}>
                  {mockIncidents.filter(i => i.severity === 'critical').length}
                </div>
                <div className="stat-title">Critical</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color: 'var(--accent-orange)' }}>
                  {mockIncidents.filter(i => i.severity === 'high').length}
                </div>
                <div className="stat-title">High</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color: 'var(--accent-yellow)' }}>
                  {mockIncidents.filter(i => i.severity === 'medium').length}
                </div>
                <div className="stat-title">Medium</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color: 'var(--accent-green)' }}>
                  {mockIncidents.filter(i => i.severity === 'low').length}
                </div>
                <div className="stat-title">Low</div>
              </div>
            </div>

            <div className="incidents-list">
              {filteredIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="incident-block"
                  onClick={() => setSelectedIncident(incident)}
                >
                  <div className="incident-header">
                    <div className="incident-id">{incident.incidentId}</div>
                    <div className={`incident-severity ${incident.severity}`}>
                      {incident.severity}
                    </div>
                  </div>

                  <div className="incident-meta">
                    <div className="incident-meta-item">
                      <div className="incident-meta-label">USER</div>
                      <div className="incident-meta-value">{incident.affectedUser}</div>
                    </div>
                    <div className="incident-meta-item">
                      <div className="incident-meta-label">TIMESTAMP</div>
                      <div className="incident-meta-value">{incident.timestamp}</div>
                    </div>
                    <div className="incident-meta-item">
                      <div className="incident-meta-label">THREAT TYPE</div>
                      <div className="incident-meta-value">{incident.threatType}</div>
                    </div>
                    <div className="incident-meta-item">
                      <div className="incident-meta-label">DETECTION</div>
                      <div className="incident-meta-value">{incident.detectionMethod}</div>
                    </div>
                  </div>

                  <div className="incident-description">{incident.description}</div>

                  <div className={`incident-status ${incident.status}`}>
                    {incident.status.replace('_', ' ')}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="tectonic-sidebar">
            <div className="tectonic-block">
              <span className="block-label">Filter_Controls</span>

              <div className="filter-section">
                <label className="filter-label">Severity Level</label>
                <button
                  className={`filter-button ${severityFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setSeverityFilter('all')}
                >
                  All Severities
                </button>
                <button
                  className={`filter-button ${severityFilter === 'critical' ? 'active' : ''}`}
                  onClick={() => setSeverityFilter('critical')}
                >
                  Critical
                </button>
                <button
                  className={`filter-button ${severityFilter === 'high' ? 'active' : ''}`}
                  onClick={() => setSeverityFilter('high')}
                >
                  High
                </button>
                <button
                  className={`filter-button ${severityFilter === 'medium' ? 'active' : ''}`}
                  onClick={() => setSeverityFilter('medium')}
                >
                  Medium
                </button>
                <button
                  className={`filter-button ${severityFilter === 'low' ? 'active' : ''}`}
                  onClick={() => setSeverityFilter('low')}
                >
                  Low
                </button>
              </div>

              <div className="filter-section">
                <label className="filter-label">Status</label>
                <button
                  className={`filter-button ${statusFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('all')}
                >
                  All Statuses
                </button>
                <button
                  className={`filter-button ${statusFilter === 'open' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('open')}
                >
                  Open
                </button>
                <button
                  className={`filter-button ${statusFilter === 'investigating' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('investigating')}
                >
                  Investigating
                </button>
                <button
                  className={`filter-button ${statusFilter === 'resolved' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('resolved')}
                >
                  Resolved
                </button>
                <button
                  className={`filter-button ${statusFilter === 'escalated' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('escalated')}
                >
                  Escalated
                </button>
              </div>
            </div>

            <div className="tectonic-block" style={{ flexGrow: 1 }}>
              <span className="block-label">Recent_Activity</span>
              <div className="activity-feed">
                <div className="activity-item">
                  <div className="activity-time">13:45:00</div>
                  <div className="activity-action">New incident <span>INC-2026-0428</span></div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">12:30:00</div>
                  <div className="activity-action">Status update <span>INC-2026-0427</span></div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">11:15:00</div>
                  <div className="activity-action">Resolved <span>INC-2026-0426</span></div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">10:00:00</div>
                  <div className="activity-action">Escalated <span>INC-2026-0425</span></div>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
};

export default SecurityIncidentReports;
