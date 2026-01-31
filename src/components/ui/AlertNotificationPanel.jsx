import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../AppIcon";

const AlertNotificationPanel = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      severity: "critical",
      title: "Multiple Failed Authentication Attempts",
      message: "User john.doe@company.com - 5 failed attempts in 2 minutes",
      timestamp: "2026-01-28 14:05:00",
      source: "Authentication Monitor",
      targetPath: "/real-time-monitoring",
      read: false,
    },
    {
      id: 2,
      severity: "high",
      title: "Unusual Behavioral Pattern Detected",
      message: "Typing pattern deviation exceeds 85% threshold",
      timestamp: "2026-01-28 13:58:00",
      source: "Behavioral Analytics",
      targetPath: "/behavioral-analytics",
      read: false,
    },
    {
      id: 3,
      severity: "medium",
      title: "New Device Enrollment Request",
      message: "User sarah.smith@company.com requesting device authorization",
      timestamp: "2026-01-28 13:45:00",
      source: "User Management",
      targetPath: "/user-enrollment-setup",
      read: true,
    },
  ]);

  const severityConfig = {
    critical: {
      label: "Critical",
      color: "text-white",
      bgGradient: "bg-gradient-danger",
      borderColor: "border-danger-500/50",
      icon: "AlertCircle",
      pulse: true,
    },
    high: {
      label: "High",
      color: "text-white",
      bgGradient: "bg-gradient-to-r from-warning-500 to-orange-500",
      borderColor: "border-warning-500/50",
      icon: "AlertTriangle",
      pulse: false,
    },
    medium: {
      label: "Medium",
      color: "text-white",
      bgGradient: "bg-gradient-to-r from-primary-500 to-accent-500",
      borderColor: "border-primary-500/50",
      icon: "Info",
      pulse: false,
    },
    low: {
      label: "Low",
      color: "text-muted-foreground",
      bgGradient: "bg-muted/20",
      borderColor: "border-muted",
      icon: "Bell",
      pulse: false,
    },
  };

  const unreadCount = alerts?.filter((alert) => !alert?.read)?.length;

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  const markAsRead = (alertId) => {
    setAlerts(
      alerts?.map((alert) =>
        alert?.id === alertId ? { ...alert, read: true } : alert,
      ),
    );
  };

  const markAllAsRead = () => {
    setAlerts(alerts?.map((alert) => ({ ...alert, read: true })));
  };

  const handleAlertClick = (alert) => {
    markAsRead(alert?.id);
    navigate(alert?.targetPath);
    closePanel();
  };

  const clearAlert = (alertId, event) => {
    event?.stopPropagation();
    setAlerts(alerts?.filter((alert) => alert?.id !== alertId));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date?.toLocaleString();
  };

  return (
    <>
      <button
        onClick={togglePanel}
        className="fixed top-4 right-4 z-[200] flex items-center justify-center w-14 h-14 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border border-white/10 rounded-xl shadow-elevation-2 transition-all duration-300 hover:shadow-glow hover:scale-110"
        aria-label="Open notifications"
        aria-expanded={isOpen}
      >
        <div className="relative">
          <Icon name="Bell" size={24} color="var(--color-foreground)" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[22px] h-[22px] px-1.5 bg-gradient-danger text-white text-xs font-bold rounded-full shadow-glow-pink animate-pulse-glow">
              {unreadCount}
            </span>
          )}
        </div>
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[250] bg-black/20 backdrop-blur-sm"
            onClick={closePanel}
            aria-hidden="true"
          />

          <div className="fixed top-20 right-4 z-[300] w-full max-w-md bg-card/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-elevation-4 overflow-hidden animate-slide-in-right">
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-primary-500/5 to-accent-500/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg shadow-glow-sm">
                  <Icon name="Bell" size={20} color="#ffffff" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Security Alerts
                </h3>
                {unreadCount > 0 && (
                  <span className="px-3 py-1 bg-gradient-danger text-white text-xs font-bold rounded-lg shadow-sm">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={closePanel}
                  className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted/50 transition-all duration-200"
                  aria-label="Close notifications"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto scrollbar-thin">
              {alerts?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="p-4 bg-gradient-success rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] mb-4">
                    <Icon
                      name="CheckCircle"
                      size={48}
                      color="#ffffff"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center font-medium">
                    No security alerts at this time
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {alerts?.map((alert) => {
                    const config = severityConfig?.[alert?.severity];
                    return (
                      <div
                        key={alert?.id}
                        onClick={() => handleAlertClick(alert)}
                        className={`
                          group p-4 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-primary-500/5 hover:to-accent-500/5
                          ${!alert?.read ? "bg-muted/10" : ""}
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`
                            flex items-center justify-center w-12 h-12 rounded-xl
                            ${config?.bgGradient} ${config?.borderColor} border-2
                            ${config?.pulse ? "animate-pulse-glow" : ""}
                            shadow-sm transition-all duration-300 group-hover:scale-110
                          `}
                          >
                            <Icon
                              name={config?.icon}
                              size={20}
                              color="#ffffff"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <h4
                                className={`
                                text-sm font-bold leading-tight
                                ${!alert?.read ? "text-foreground" : "text-muted-foreground"}
                              `}
                              >
                                {alert?.title}
                              </h4>
                              <button
                                onClick={(e) => clearAlert(alert?.id, e)}
                                className="flex-shrink-0 p-1.5 rounded-lg hover:bg-muted/50 transition-all duration-200"
                                aria-label="Clear alert"
                              >
                                <Icon name="X" size={14} />
                              </button>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                              {alert?.message}
                            </p>

                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs text-muted-foreground font-medium px-2 py-1 bg-muted/30 rounded-md">
                                {alert?.source}
                              </span>
                              <span className="text-xs text-muted-foreground font-medium">
                                {formatTimestamp(alert?.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AlertNotificationPanel;
