import React from "react";
import Icon from "../../../components/AppIcon";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";

const FilterPanel = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const departmentOptions = [
    { value: "all", label: "All Departments" },
    { value: "engineering", label: "Engineering" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
    { value: "hr", label: "Human Resources" },
    { value: "finance", label: "Finance" },
  ];

  const riskLevelOptions = [
    { value: "all", label: "All Risk Levels" },
    { value: "critical", label: "Critical" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const timeRangeOptions = [
    { value: "last-hour", label: "Last Hour" },
    { value: "last-4-hours", label: "Last 4 Hours" },
    { value: "today", label: "Today" },
    { value: "last-7-days", label: "Last 7 Days" },
    { value: "last-30-days", label: "Last 30 Days" },
  ];

  const authMethodOptions = [
    { value: "all", label: "All Methods" },
    { value: "biometric", label: "Biometric" },
    { value: "password", label: "Password" },
    { value: "mfa", label: "Multi-Factor" },
    { value: "sso", label: "Single Sign-On" },
  ];

  return (
    <div className="relative bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6 overflow-hidden group">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg shadow-glow-sm">
              <Icon name="Filter" size={20} color="#ffffff" />
            </div>
            <h3 className="text-base md:text-lg font-heading font-bold text-foreground">
              Filter Sessions
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={onResetFilters}
          >
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Department"
            options={departmentOptions}
            value={filters?.department}
            onChange={(value) => onFilterChange("department", value)}
          />

          <Select
            label="Risk Level"
            options={riskLevelOptions}
            value={filters?.riskLevel}
            onChange={(value) => onFilterChange("riskLevel", value)}
          />

          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={filters?.timeRange}
            onChange={(value) => onFilterChange("timeRange", value)}
          />

          <Select
            label="Auth Method"
            options={authMethodOptions}
            value={filters?.authMethod}
            onChange={(value) => onFilterChange("authMethod", value)}
          />
        </div>

        <div className="flex items-center justify-between gap-3 mt-5 pt-5 border-t border-white/10">
          <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg">
            <Icon name="Database" size={16} className="text-primary-400" />
            <span className="text-sm font-semibold text-foreground">
              {filters?.resultCount} sessions found
            </span>
          </div>
          <Button
            variant="default"
            size="sm"
            iconName="Search"
            onClick={onApplyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
