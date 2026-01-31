import React from "react";
import Icon from "../../../components/AppIcon";

const MetricCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  iconColor = "var(--color-accent)",
  trend = [],
}) => {
  const changeConfig = {
    positive: {
      color: "text-success-500",
      bgColor: "bg-gradient-success",
      icon: "TrendingUp",
    },
    negative: {
      color: "text-danger-500",
      bgColor: "bg-gradient-danger",
      icon: "TrendingDown",
    },
    neutral: {
      color: "text-muted-foreground",
      bgColor: "bg-muted/20",
      icon: "Minus",
    },
  };

  const config = changeConfig?.[changeType];

  // Determine gradient based on icon or default
  const getGradientClass = () => {
    if (icon === "AlertTriangle") return "from-warning-500/10 to-danger-500/10";
    if (icon === "CheckCircle") return "from-success-500/10 to-primary-500/10";
    if (icon === "TrendingUp") return "from-primary-500/10 to-accent-500/10";
    return "from-primary-500/10 to-accent-500/10";
  };

  return (
    <div className={`group relative bg-gradient-to-br ${getGradientClass()} backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 overflow-hidden`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2 font-medium">{title}</p>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              {value}
            </h3>
          </div>
          <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl shadow-glow-sm group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
            <Icon name={icon} size={24} color="#ffffff" />
          </div>
        </div>

        {change && (
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white ${config?.bgColor} shadow-sm`}
            >
              <Icon name={config?.icon} size={14} />
              {change}
            </span>
            <span className="text-xs text-muted-foreground">
              vs last period
            </span>
          </div>
        )}

        {trend?.length > 0 && (
          <div className="mt-4 flex items-end gap-1 h-10">
            {trend?.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-primary-500/40 to-accent-500/40 rounded-sm transition-all duration-300 hover:from-primary-500/60 hover:to-accent-500/60 relative overflow-hidden"
                style={{ height: `${value}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-accent-500/20 shimmer" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
