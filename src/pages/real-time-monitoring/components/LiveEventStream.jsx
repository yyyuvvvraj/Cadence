import React from "react";
import Icon from "../../../components/AppIcon";

const LiveEventStream = ({ events, onEventClick }) => {
  const severityConfig = {
    critical: {
      label: "Critical",
      color: "text-error",
      bgColor: "bg-error/10",
      borderColor: "border-error/30",
      icon: "AlertCircle",
      pulse: true,
    },
    high: {
      label: "High",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/30",
      icon: "AlertTriangle",
      pulse: false,
    },
    medium: {
      label: "Medium",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
      icon: "Info",
      pulse: false,
    },
    low: {
      label: "Low",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/30",
      icon: "CheckCircle",
      pulse: false,
    },
  };

  const eventTypeIcons = {
    authentication_attempt: "Key",
    confidence_change: "TrendingUp",
    anomaly_detected: "AlertTriangle",
    session_started: "LogIn",
    session_ended: "LogOut",
    threshold_breach: "AlertCircle",
    pattern_deviation: "Activity",
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);

    if (diffSecs < 10) return "Just now";
    if (diffSecs < 60) return `${diffSecs}s ago`;
    const diffMins = Math.floor(diffSecs / 60);
    if (diffMins < 60) return `${diffMins}m ago`;
    return date?.toLocaleTimeString();
  };

  return (
    <div className="space-y-3">
      {events?.map((event) => {
        const config = severityConfig?.[event?.severity];
        const eventIcon = eventTypeIcons?.[event?.type] || "Activity";

        return (
          <div
            key={event?.id}
            onClick={() => onEventClick(event)}
            className={`
              p-4 bg-card border rounded-lg cursor-pointer transition-smooth hover:bg-muted/30
              ${config?.borderColor}
              ${config?.pulse ? "animate-pulse-slow" : ""}
            `}
          >
            <div className="flex items-start gap-3">
              <div
                className={`
                flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0
                ${config?.bgColor} ${config?.borderColor} border
              `}
              >
                <Icon
                  name={config?.icon}
                  size={20}
                  color={`var(--color-${event?.severity === "critical" ? "error" : event?.severity === "high" ? "warning" : event?.severity === "medium" ? "accent" : "success"})`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-semibold text-foreground">
                      {event?.title}
                    </h4>
                    <span
                      className={`
                      inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium
                      ${config?.color} ${config?.bgColor}
                    `}
                    >
                      {config?.label}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground caption whitespace-nowrap">
                    {formatTimestamp(event?.timestamp)}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {event?.description}
                </p>

                <div className="flex items-center flex-wrap gap-4 text-xs text-muted-foreground caption">
                  <div className="flex items-center gap-1">
                    <Icon name="User" size={12} />
                    <span>{event?.userName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name={eventIcon} size={12} />
                    <span>{event?.eventType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    <span>{event?.location}</span>
                  </div>
                  {event?.confidenceScore && (
                    <div className="flex items-center gap-1">
                      <Icon name="Percent" size={12} />
                      <span>Confidence: {event?.confidenceScore}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LiveEventStream;
