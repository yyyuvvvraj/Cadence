import React from "react";
import Icon from "../../../components/AppIcon";

const MetricsDashboard = ({ metrics }) => {
  const metricCards = [
    {
      label: "Active Sessions",
      value: metrics?.activeSessions,
      change: metrics?.sessionsChange,
      icon: "Users",
      color: "accent",
      trend: metrics?.sessionsChange > 0 ? "up" : "down",
    },
    {
      label: "Avg Confidence",
      value: `${metrics?.avgConfidence}%`,
      change: metrics?.confidenceChange,
      icon: "TrendingUp",
      color: "success",
      trend: metrics?.confidenceChange > 0 ? "up" : "down",
    },
    {
      label: "Active Threats",
      value: metrics?.activeThreats,
      change: metrics?.threatsChange,
      icon: "AlertTriangle",
      color: "error",
      trend: metrics?.threatsChange > 0 ? "up" : "down",
    },
    {
      label: "Events/Min",
      value: metrics?.eventsPerMin,
      change: metrics?.eventsChange,
      icon: "Activity",
      color: "warning",
      trend: metrics?.eventsChange > 0 ? "up" : "down",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      accent: "bg-accent/10 text-accent",
      success: "bg-success/10 text-success",
      error: "bg-error/10 text-error",
      warning: "bg-warning/10 text-warning",
    };
    return colors?.[color] || colors?.accent;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {metricCards?.map((metric, index) => (
        <div
          key={index}
          className="p-4 md:p-6 bg-card border border-border rounded-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={`
              flex items-center justify-center w-12 h-12 rounded-lg
              ${getColorClasses(metric?.color)}
            `}
            >
              <Icon
                name={metric?.icon}
                size={24}
                color={`var(--color-${metric?.color})`}
              />
            </div>
            <div
              className={`
              flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
              ${
                metric?.trend === "up"
                  ? "bg-success/10 text-success"
                  : "bg-error/10 text-error"
              }
            `}
            >
              <Icon
                name={metric?.trend === "up" ? "TrendingUp" : "TrendingDown"}
                size={12}
              />
              <span>{Math.abs(metric?.change)}%</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1 caption">
              {metric?.label}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              {metric?.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsDashboard;
