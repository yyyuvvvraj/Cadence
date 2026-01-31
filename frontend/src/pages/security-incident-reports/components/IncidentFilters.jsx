import React, { useState } from "react";

import Select from "../../../components/ui/Select";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const IncidentFilters = ({ onFilterChange, onSavePreset, savedPresets }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    threatType: "",
    severity: "",
    department: "",
    status: "",
    dateFrom: "",
    dateTo: "",
    searchQuery: "",
  });

  const threatTypeOptions = [
    { value: "", label: "All Threat Types" },
    { value: "authentication_failure", label: "Authentication Failure" },
    { value: "behavioral_anomaly", label: "Behavioral Anomaly" },
    { value: "unauthorized_access", label: "Unauthorized Access" },
    { value: "suspicious_activity", label: "Suspicious Activity" },
    { value: "policy_violation", label: "Policy Violation" },
  ];

  const severityOptions = [
    { value: "", label: "All Severities" },
    { value: "critical", label: "Critical" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const departmentOptions = [
    { value: "", label: "All Departments" },
    { value: "engineering", label: "Engineering" },
    { value: "finance", label: "Finance" },
    { value: "hr", label: "Human Resources" },
    { value: "sales", label: "Sales" },
    { value: "operations", label: "Operations" },
  ];

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "open", label: "Open" },
    { value: "investigating", label: "Investigating" },
    { value: "resolved", label: "Resolved" },
    { value: "false_positive", label: "False Positive" },
    { value: "escalated", label: "Escalated" },
  ];

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      threatType: "",
      severity: "",
      department: "",
      status: "",
      dateFrom: "",
      dateTo: "",
      searchQuery: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const handleSavePreset = () => {
    const presetName = prompt("Enter preset name:");
    if (presetName) {
      onSavePreset(presetName, filters);
    }
  };

  const hasActiveFilters = Object.values(filters)?.some(
    (value) => value !== "",
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search incidents by ID, user, or description..."
            value={filters?.searchQuery}
            onChange={(e) =>
              handleFilterChange("searchQuery", e?.target?.value)
            }
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            iconName={showFilters ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" iconName="X" onClick={handleClearFilters}>
              Clear
            </Button>
          )}

          <Button
            variant="outline"
            iconName="Save"
            onClick={handleSavePreset}
            disabled={!hasActiveFilters}
          >
            Save Preset
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className="p-4 md:p-6 bg-card border border-border rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Threat Type"
              options={threatTypeOptions}
              value={filters?.threatType}
              onChange={(value) => handleFilterChange("threatType", value)}
            />

            <Select
              label="Severity"
              options={severityOptions}
              value={filters?.severity}
              onChange={(value) => handleFilterChange("severity", value)}
            />

            <Select
              label="Department"
              options={departmentOptions}
              value={filters?.department}
              onChange={(value) => handleFilterChange("department", value)}
            />

            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange("status", value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Date From"
              value={filters?.dateFrom}
              onChange={(e) => handleFilterChange("dateFrom", e?.target?.value)}
            />

            <Input
              type="date"
              label="Date To"
              value={filters?.dateTo}
              onChange={(e) => handleFilterChange("dateTo", e?.target?.value)}
            />
          </div>

          {savedPresets && savedPresets?.length > 0 && (
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-2">
                Saved Presets
              </p>
              <div className="flex flex-wrap gap-2">
                {savedPresets?.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilters(preset?.filters);
                      onFilterChange(preset?.filters);
                    }}
                  >
                    {preset?.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IncidentFilters;
