import React, { useState } from "react";
import {
  LineChart,
  Line,
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

const BehavioralPatternCharts = ({ keystrokeData, mouseData, sessionData }) => {
  const [activeChart, setActiveChart] = useState("keystroke");

  const chartTypes = [
    { id: "keystroke", label: "Keystroke Dynamics", icon: "Keyboard" },
    { id: "mouse", label: "Mouse Movement", icon: "Mouse" },
    { id: "session", label: "Session Timing", icon: "Clock" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-xs text-muted-foreground">
              {entry?.name}:{" "}
              <span className="font-semibold" style={{ color: entry?.color }}>
                {entry?.value}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Behavioral Pattern Analysis
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          {chartTypes?.map((chart) => (
            <button
              key={chart?.id}
              onClick={() => setActiveChart(chart?.id)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth
                ${
                  activeChart === chart?.id
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }
              `}
            >
              <Icon name={chart?.icon} size={16} />
              <span className="hidden sm:inline">{chart?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div
        className="w-full h-64 md:h-80"
        aria-label={`${chartTypes?.find((c) => c?.id === activeChart)?.label} Chart`}
      >
        {activeChart === "keystroke" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={keystrokeData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
              <XAxis
                dataKey="time"
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: "12px" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "12px" }} iconType="circle" />
              <Line
                type="monotone"
                dataKey="dwellTime"
                stroke="var(--color-accent)"
                strokeWidth={2}
                name="Dwell Time (ms)"
                dot={{ fill: "var(--color-accent)", r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="flightTime"
                stroke="var(--color-success)"
                strokeWidth={2}
                name="Flight Time (ms)"
                dot={{ fill: "var(--color-success)", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {activeChart === "mouse" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mouseData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
              <XAxis
                dataKey="interval"
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: "12px" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "12px" }} iconType="circle" />
              <Bar
                dataKey="velocity"
                fill="var(--color-accent)"
                name="Velocity (px/s)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="acceleration"
                fill="var(--color-warning)"
                name="Acceleration"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeChart === "session" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sessionData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
              <XAxis
                dataKey="time"
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: "12px" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "12px" }} iconType="circle" />
              <Line
                type="monotone"
                dataKey="confidence"
                stroke="var(--color-success)"
                strokeWidth={2}
                name="Confidence Score"
                dot={{ fill: "var(--color-success)", r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="riskScore"
                stroke="var(--color-error)"
                strokeWidth={2}
                name="Risk Score"
                dot={{ fill: "var(--color-error)", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default BehavioralPatternCharts;
