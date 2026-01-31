import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const PatternComparisonCard = ({ comparisonData }) => {
  const [selectedMetric, setSelectedMetric] = useState("overall");

  const metrics = [
    { id: "overall", label: "Overall Match", icon: "TrendingUp" },
    { id: "keystroke", label: "Keystroke", icon: "Keyboard" },
    { id: "mouse", label: "Mouse", icon: "Mouse" },
    { id: "timing", label: "Timing", icon: "Clock" },
  ];

  const currentData = comparisonData?.[selectedMetric];

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return "text-success";
    if (percentage >= 70) return "text-warning";
    return "text-error";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="GitCompare" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            Pattern Comparison
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground caption">
            Current vs baseline analysis
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4 md:mb-6 overflow-x-auto pb-2">
        {metrics?.map((metric) => (
          <button
            key={metric?.id}
            onClick={() => setSelectedMetric(metric?.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
              transition-smooth whitespace-nowrap flex-shrink-0
              ${
                selectedMetric === metric?.id
                  ? "bg-accent/10 text-accent border border-accent/30"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
              }
            `}
          >
            <Icon name={metric?.icon} size={16} />
            <span>{metric?.label}</span>
          </button>
        ))}
      </div>
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="var(--color-muted)"
                strokeWidth="8"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="8"
                strokeDasharray={`${currentData?.matchPercentage * 2.83} 283`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={`text-3xl md:text-4xl font-bold ${getMatchColor(currentData?.matchPercentage)}`}
              >
                {currentData?.matchPercentage}%
              </span>
              <span className="text-xs text-muted-foreground caption">
                Match Rate
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="TrendingUp" size={16} color="var(--color-success)" />
              <span className="text-xs text-muted-foreground caption">
                Similarities
              </span>
            </div>
            <p className="text-lg md:text-xl font-semibold text-foreground">
              {currentData?.similarities}
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="TrendingDown" size={16} color="var(--color-error)" />
              <span className="text-xs text-muted-foreground caption">
                Deviations
              </span>
            </div>
            <p className="text-lg md:text-xl font-semibold text-foreground">
              {currentData?.deviations}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">
            Key Findings
          </h4>
          {currentData?.findings?.map((finding, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
            >
              <Icon
                name={
                  finding?.type === "positive" ? "CheckCircle" : "AlertCircle"
                }
                size={18}
                color={
                  finding?.type === "positive"
                    ? "var(--color-success)"
                    : "var(--color-warning)"
                }
                className="flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-foreground">{finding?.text}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon
              name="Lightbulb"
              size={20}
              color="var(--color-accent)"
              className="flex-shrink-0"
            />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                Recommendation
              </p>
              <p className="text-xs md:text-sm text-muted-foreground caption">
                {currentData?.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternComparisonCard;
