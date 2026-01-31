import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Icon from "../../../components/AppIcon";

const TrendChart = ({
  title,
  description,
  data,
  chartType = "line",
  dataKeys,
  colors,
  height = 320,
}) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              />
              <span>
                {entry?.name}: {entry?.value?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 20, left: 0, bottom: 5 },
    };

    switch (chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              {dataKeys?.map((key, index) => (
                <linearGradient
                  key={key}
                  id={`color${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={colors?.[index]}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors?.[index]}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="timestamp"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px" }} iconType="circle" />
            {dataKeys?.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors?.[index]}
                fillOpacity={1}
                fill={`url(#color${key})`}
              />
            ))}
          </AreaChart>
        );

      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="timestamp"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px" }} iconType="circle" />
            {dataKeys?.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors?.[index]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );

      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="timestamp"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px" }} iconType="circle" />
            {dataKeys?.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors?.[index]}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground caption">
            {description}
          </p>
        </div>
        <button className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted/50 transition-smooth">
          <Icon name="MoreVertical" size={18} />
        </button>
      </div>

      <div style={{ width: "100%", height: `${height}px` }} aria-label={title}>
        <ResponsiveContainer>{renderChart()}</ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
