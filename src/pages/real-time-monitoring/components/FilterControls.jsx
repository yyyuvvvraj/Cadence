import React from "react";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const FilterControls = ({ filters, onFilterChange, onSearch }) => {
  const severityOptions = [
    { value: "all", label: "All Severities" },
    { value: "critical", label: "Critical" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const departmentOptions = [
    { value: "all", label: "All Departments" },
    { value: "engineering", label: "Engineering" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
    { value: "finance", label: "Finance" },
    { value: "hr", label: "Human Resources" },
  ];

  const timeWindowOptions = [
    { value: "last_5min", label: "Last 5 minutes" },
    { value: "last_15min", label: "Last 15 minutes" },
    { value: "last_hour", label: "Last hour" },
    { value: "last_24hours", label: "Last 24 hours" },
    { value: "custom", label: "Custom range" },
  ];

  const eventTypeOptions = [
    { value: "all", label: "All Event Types" },
    { value: "authentication_attempt", label: "Authentication Attempts" },
    { value: "confidence_change", label: "Confidence Changes" },
    { value: "anomaly_detected", label: "Anomaly Detections" },
    { value: "session_started", label: "Session Started" },
    { value: "session_ended", label: "Session Ended" },
    { value: "threshold_breach", label: "Threshold Breaches" },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Filter" size={20} color="var(--color-accent)" />
        <h3 className="text-lg font-semibold text-foreground">
          Filter & Search
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Input
            type="search"
            placeholder="Search users, events..."
            value={filters?.searchQuery}
            onChange={(e) => onSearch(e?.target?.value)}
            className="w-full"
          />
        </div>

        <Select
          options={severityOptions}
          value={filters?.severity}
          onChange={(value) => onFilterChange("severity", value)}
          placeholder="Select severity"
        />

        <Select
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => onFilterChange("department", value)}
          placeholder="Select department"
        />

        <Select
          options={timeWindowOptions}
          value={filters?.timeWindow}
          onChange={(value) => onFilterChange("timeWindow", value)}
          placeholder="Select time window"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Select
          options={eventTypeOptions}
          value={filters?.eventType}
          onChange={(value) => onFilterChange("eventType", value)}
          placeholder="Select event type"
        />

        <div className="flex items-center gap-2">
          <button
            onClick={() => onFilterChange("reset", null)}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
          >
            <Icon name="RotateCcw" size={16} />
            <span>Reset Filters</span>
          </button>
          <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 text-accent rounded-md text-sm">
            <Icon name="CheckCircle" size={16} />
            <span className="font-medium">{filters?.resultCount} results</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
