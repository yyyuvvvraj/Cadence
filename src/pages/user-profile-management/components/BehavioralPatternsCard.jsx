import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const BehavioralPatternsCard = ({ patterns }) => {
  const [selectedPattern, setSelectedPattern] = useState("keystroke");

  const patternTypes = [
    { id: "keystroke", label: "Keystroke Dynamics", icon: "Keyboard" },
    { id: "mouse", label: "Mouse Movement", icon: "Mouse" },
    { id: "touch", label: "Touch Gestures", icon: "Hand" },
    { id: "scroll", label: "Scroll Behavior", icon: "ArrowDownUp" },
  ];

  const currentPattern = patterns?.[selectedPattern];

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return "text-success bg-success/10";
    if (confidence >= 70) return "text-warning bg-warning/10";
    return "text-error bg-error/10";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="TrendingUp" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              Behavioral Patterns
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground caption">
              Real-time pattern analysis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {patternTypes?.map((type) => (
            <button
              key={type?.id}
              onClick={() => setSelectedPattern(type?.id)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                transition-smooth whitespace-nowrap flex-shrink-0
                ${
                  selectedPattern === type?.id
                    ? "bg-accent/10 text-accent border border-accent/30"
                    : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                }
              `}
            >
              <Icon name={type?.icon} size={16} />
              <span className="hidden sm:inline">{type?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm text-muted-foreground caption">
                Baseline Confidence
              </span>
              <span
                className={`
                px-2 py-1 rounded-md text-xs font-medium
                ${getConfidenceColor(currentPattern?.confidence)}
              `}
              >
                {currentPattern?.confidence}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-smooth"
                style={{ width: `${currentPattern?.confidence}%` }}
              />
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm text-muted-foreground caption">
                Deviation Rate
              </span>
              <span className="text-sm md:text-base font-semibold text-foreground">
                {currentPattern?.deviation}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-warning h-2 rounded-full transition-smooth"
                style={{ width: `${currentPattern?.deviation}%` }}
              />
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm text-muted-foreground caption">
                Sample Count
              </span>
              <span className="text-sm md:text-base font-semibold text-foreground">
                {currentPattern?.sampleCount}
              </span>
            </div>
            <p className="text-xs text-muted-foreground caption">
              Last updated: {currentPattern?.lastUpdated}
            </p>
          </div>
        </div>

        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Pattern Characteristics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentPattern?.characteristics?.map((char, index) => (
              <div key={index} className="flex items-start gap-2">
                <Icon
                  name="CheckCircle"
                  size={16}
                  color="var(--color-success)"
                  className="flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm text-foreground">{char?.label}</p>
                  <p className="text-xs text-muted-foreground caption">
                    {char?.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon
              name="Info"
              size={20}
              color="var(--color-accent)"
              className="flex-shrink-0"
            />
            <div>
              <p className="text-sm text-foreground mb-1">
                Pattern Analysis Status
              </p>
              <p className="text-xs md:text-sm text-muted-foreground caption">
                {currentPattern?.analysisNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehavioralPatternsCard;
