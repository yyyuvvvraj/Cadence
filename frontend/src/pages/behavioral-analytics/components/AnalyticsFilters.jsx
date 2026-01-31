import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";

const AnalyticsFilters = ({ onFilterChange, onExport, onGenerateReport }) => {
  const [filters, setFilters] = useState({
    dateRange: "7days",
    userGroup: "all",
    deviceType: "all",
    anomalyCategory: "all",
    metricType: "all",
  });

  const dateRangeOptions = [
    { value: "24hours", label: "Last 24 Hours" },
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 90 Days" },
    { value: "custom", label: "Custom Range" },
  ];

  const userGroupOptions = [
    { value: "all", label: "All Users" },
    { value: "executives", label: "Executives" },
    { value: "developers", label: "Developers" },
    { value: "support", label: "Support Team" },
    { value: "sales", label: "Sales Team" },
    { value: "high-risk", label: "High Risk Users" },
  ];

  const deviceTypeOptions = [
    { value: "all", label: "All Devices" },
    { value: "desktop", label: "Desktop" },
    { value: "laptop", label: "Laptop" },
    { value: "tablet", label: "Tablet" },
    { value: "mobile", label: "Mobile" },
  ];

  const anomalyCategoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "keystroke", label: "Keystroke Anomalies" },
    { value: "mouse", label: "Mouse Movement Anomalies" },
    { value: "timing", label: "Timing Anomalies" },
    { value: "pattern", label: "Pattern Deviations" },
    { value: "session", label: "Session Anomalies" },
  ];

  const metricTypeOptions = [
    { value: "all", label: "All Metrics" },
    { value: "confidence", label: "Confidence Scores" },
    { value: "consistency", label: "Consistency Rates" },
    { value: "velocity", label: "Typing Velocity" },
    { value: "accuracy", label: "Pattern Accuracy" },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleReset = () => {
    const defaultFilters = {
      dateRange: "7days",
      userGroup: "all",
      deviceType: "all",
      anomalyCategory: "all",
      metricType: "all",
    };
    setFilters(defaultFilters);
    if (onFilterChange) {
      onFilterChange(defaultFilters);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Filter" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              Analytics Filters
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground caption">
              Customize data analysis parameters
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={handleReset}
          >
            Reset Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Export Data
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            onClick={onGenerateReport}
          >
            Generate Report
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange("dateRange", value)}
        />

        <Select
          label="User Group"
          options={userGroupOptions}
          value={filters?.userGroup}
          onChange={(value) => handleFilterChange("userGroup", value)}
        />

        <Select
          label="Device Type"
          options={deviceTypeOptions}
          value={filters?.deviceType}
          onChange={(value) => handleFilterChange("deviceType", value)}
        />

        <Select
          label="Anomaly Category"
          options={anomalyCategoryOptions}
          value={filters?.anomalyCategory}
          onChange={(value) => handleFilterChange("anomalyCategory", value)}
        />

        <Select
          label="Metric Type"
          options={metricTypeOptions}
          value={filters?.metricType}
          onChange={(value) => handleFilterChange("metricType", value)}
        />
      </div>
    </div>
  );
};

export default AnalyticsFilters;
