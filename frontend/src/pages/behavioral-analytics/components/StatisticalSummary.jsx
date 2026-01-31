import React from "react";
import Icon from "../../../components/AppIcon";

const StatisticalSummary = ({ statistics }) => {
  const summaryCards = [
    {
      label: "Average Confidence",
      value: `${statistics?.avgConfidence}%`,
      change: statistics?.confidenceChange,
      icon: "TrendingUp",
      color: "accent",
    },
    {
      label: "Pattern Accuracy",
      value: `${statistics?.patternAccuracy}%`,
      change: statistics?.accuracyChange,
      icon: "Target",
      color: "success",
    },
    {
      label: "Total Anomalies",
      value: statistics?.totalAnomalies,
      change: statistics?.anomalyChange,
      icon: "AlertTriangle",
      color: "warning",
    },
    {
      label: "Active Users",
      value: statistics?.activeUsers,
      change: statistics?.userChange,
      icon: "Users",
      color: "accent",
    },
  ];

  const getChangeColor = (change) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-error";
    return "text-muted-foreground";
  };

  const getChangeIcon = (change) => {
    if (change > 0) return "TrendingUp";
    if (change < 0) return "TrendingDown";
    return "Minus";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="BarChart3" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            Statistical Summary
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground caption">
            Key performance indicators
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards?.map((card, index) => (
          <div
            key={index}
            className="bg-muted/30 border border-border rounded-lg p-4 hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`flex items-center justify-center w-10 h-10 bg-${card?.color}/10 rounded-lg`}
              >
                <Icon
                  name={card?.icon}
                  size={20}
                  color={`var(--color-${card?.color})`}
                />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${getChangeColor(card?.change)}`}
              >
                <Icon name={getChangeIcon(card?.change)} size={14} />
                <span>{Math.abs(card?.change)}%</span>
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              {card?.value}
            </div>
            <div className="text-xs text-muted-foreground caption">
              {card?.label}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Pattern Correlation Analysis
          </h4>
          <div className="space-y-3">
            {statistics?.correlations?.map((correlation, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground caption">
                    {correlation?.label}
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    {correlation?.value}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent rounded-full h-2 transition-all duration-500"
                    style={{ width: `${correlation?.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            ML Model Performance
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {statistics?.modelMetrics?.map((metric, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg">
                  <Icon
                    name={metric?.icon}
                    size={16}
                    color="var(--color-accent)"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {metric?.value}%
                  </div>
                  <div className="text-xs text-muted-foreground caption">
                    {metric?.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalSummary;
