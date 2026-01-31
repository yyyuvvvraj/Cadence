import React from "react";
import Icon from "../../../components/AppIcon";

const IncidentSummaryCards = ({ summaryData }) => {
  const cards = [
    {
      id: "open",
      label: "Open Cases",
      value: summaryData?.openCases,
      change: summaryData?.openCasesChange,
      trend: summaryData?.openCasesTrend,
      icon: "AlertCircle",
      color: "error",
      bgColor: "bg-error/10",
      borderColor: "border-error/30",
    },
    {
      id: "resolved",
      label: "Resolved Threats",
      value: summaryData?.resolvedThreats,
      change: summaryData?.resolvedThreatsChange,
      trend: summaryData?.resolvedThreatsTrend,
      icon: "CheckCircle",
      color: "success",
      bgColor: "bg-success/10",
      borderColor: "border-success/30",
    },
    {
      id: "falsePositive",
      label: "False Positive Rate",
      value: `${summaryData?.falsePositiveRate}%`,
      change: summaryData?.falsePositiveChange,
      trend: summaryData?.falsePositiveTrend,
      icon: "AlertTriangle",
      color: "warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/30",
    },
    {
      id: "avgResponse",
      label: "Avg Response Time",
      value: summaryData?.avgResponseTime,
      change: summaryData?.avgResponseChange,
      trend: summaryData?.avgResponseTrend,
      icon: "Clock",
      color: "accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards?.map((card) => (
        <div
          key={card?.id}
          className={`
            p-4 md:p-6 bg-card border rounded-lg transition-smooth hover:shadow-elevation-2
            ${card?.borderColor}
          `}
        >
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div
              className={`
              flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg
              ${card?.bgColor}
            `}
            >
              <Icon
                name={card?.icon}
                size={20}
                color={`var(--color-${card?.color})`}
              />
            </div>

            <div
              className={`
              flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
              ${
                card?.trend === "up"
                  ? card?.id === "open" || card?.id === "falsePositive"
                    ? "bg-error/10 text-error"
                    : "bg-success/10 text-success"
                  : card?.id === "open" || card?.id === "falsePositive"
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error"
              }
            `}
            >
              <Icon
                name={card?.trend === "up" ? "TrendingUp" : "TrendingDown"}
                size={12}
              />
              <span>{card?.change}</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs md:text-sm text-muted-foreground caption">
              {card?.label}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              {card?.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncidentSummaryCards;
