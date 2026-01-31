import React from "react";
import Icon from "../../../components/AppIcon";

const ThreatLevelIndicator = ({ level = "low", description, lastUpdated }) => {
  const levelConfig = {
    critical: {
      label: "Critical",
      color: "text-white",
      bgGradient: "bg-gradient-danger",
      borderColor: "border-danger-500/50",
      icon: "AlertCircle",
      pulse: true,
      glowColor: "shadow-glow-pink",
    },
    high: {
      label: "High",
      color: "text-white",
      bgGradient: "bg-gradient-to-r from-warning-500/20 to-danger-500/20",
      borderColor: "border-warning-500/50",
      icon: "AlertTriangle",
      pulse: false,
      glowColor: "shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    },
    medium: {
      label: "Medium",
      color: "text-white",
      bgGradient: "bg-gradient-to-r from-primary-500/20 to-accent-500/20",
      borderColor: "border-primary-500/50",
      icon: "Info",
      pulse: false,
      glowColor: "shadow-glow",
    },
    low: {
      label: "Low",
      color: "text-white",
      bgGradient: "bg-gradient-success",
      borderColor: "border-success-500/50",
      icon: "CheckCircle",
      pulse: false,
      glowColor: "shadow-[0_0_20px_rgba(34,197,94,0.4)]",
    },
  };

  const config = levelConfig?.[level];

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`relative bg-card/50 backdrop-blur-sm border-2 ${config?.borderColor} rounded-xl p-5 md:p-6 transition-all duration-300 hover:${config?.glowColor} overflow-hidden group`}
    >
      {/* Animated background */}
      <div className={`absolute inset-0 ${config?.bgGradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

      <div className="relative z-10 flex items-start gap-4">
        <div
          className={`
          flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl
          ${config?.bgGradient} ${config?.borderColor} border-2
          ${config?.pulse ? "animate-pulse-glow" : ""}
          shadow-elevation-2 transition-all duration-300 group-hover:scale-110
        `}
        >
          <Icon
            name={config?.icon}
            size={32}
            color="#ffffff"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-lg md:text-xl font-heading font-bold text-foreground">
              Current Threat Level
            </h3>
            <span
              className={`px-4 py-1.5 rounded-lg text-sm font-bold ${config?.color} ${config?.bgGradient} shadow-sm`}
            >
              {config?.label}
            </span>
          </div>

          <p className="text-sm md:text-base text-muted-foreground mb-3 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 px-2 py-1 bg-muted/30 rounded-md">
              <Icon name="Clock" size={14} />
              <span className="font-medium">Last updated: {formatTime(lastUpdated)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${config?.bgGradient} opacity-5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2`} />
    </div>
  );
};

export default ThreatLevelIndicator;
