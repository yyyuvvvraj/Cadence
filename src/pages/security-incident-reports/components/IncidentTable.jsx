import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";

const IncidentTable = ({
  incidents,
  onIncidentSelect,
  onBulkAction,
  selectedIncidents,
  onSort,
}) => {
  const [sortField, setSortField] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");

  const severityConfig = {
    critical: {
      label: "Critical",
      color: "text-error",
      bgColor: "bg-error/10",
      icon: "AlertCircle",
    },
    high: {
      label: "High",
      color: "text-warning",
      bgColor: "bg-warning/10",
      icon: "AlertTriangle",
    },
    medium: {
      label: "Medium",
      color: "text-accent",
      bgColor: "bg-accent/10",
      icon: "Info",
    },
    low: {
      label: "Low",
      color: "text-muted-foreground",
      bgColor: "bg-muted/10",
      icon: "Bell",
    },
  };

  const statusConfig = {
    open: { label: "Open", color: "text-error", bgColor: "bg-error/10" },
    investigating: {
      label: "Investigating",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    resolved: {
      label: "Resolved",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    false_positive: {
      label: "False Positive",
      color: "text-muted-foreground",
      bgColor: "bg-muted/10",
    },
    escalated: {
      label: "Escalated",
      color: "text-error",
      bgColor: "bg-error/10",
    },
  };

  const handleSort = (field) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
    onSort(field, newDirection);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onBulkAction(
        "selectAll",
        incidents?.map((inc) => inc?.id),
      );
    } else {
      onBulkAction("deselectAll", []);
    }
  };

  const handleSelectIncident = (incidentId, checked) => {
    if (checked) {
      onBulkAction("select", [...selectedIncidents, incidentId]);
    } else {
      onBulkAction(
        "deselect",
        selectedIncidents?.filter((id) => id !== incidentId),
      );
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const allSelected =
    incidents?.length > 0 && selectedIncidents?.length === incidents?.length;
  const someSelected =
    selectedIncidents?.length > 0 &&
    selectedIncidents?.length < incidents?.length;

  return (
    <div className="space-y-4">
      {selectedIncidents?.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-accent/10 border border-accent/30 rounded-lg">
          <span className="text-sm text-foreground">
            {selectedIncidents?.length} incident
            {selectedIncidents?.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              iconName="UserPlus"
              onClick={() => onBulkAction("assign", selectedIncidents)}
            >
              Assign
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="CheckCircle"
              onClick={() => onBulkAction("resolve", selectedIncidents)}
            >
              Resolve
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="FileText"
              onClick={() => onBulkAction("export", selectedIncidents)}
            >
              Export
            </Button>
          </div>
        </div>
      )}
      <div className="hidden lg:block overflow-x-auto bg-card border border-border rounded-lg">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort("timestamp")}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-smooth"
                >
                  Timestamp
                  <Icon
                    name={
                      sortField === "timestamp" && sortDirection === "asc"
                        ? "ChevronUp"
                        : "ChevronDown"
                    }
                    size={16}
                  />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort("incidentId")}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-smooth"
                >
                  Incident ID
                  <Icon
                    name={
                      sortField === "incidentId" && sortDirection === "asc"
                        ? "ChevronUp"
                        : "ChevronDown"
                    }
                    size={16}
                  />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-semibold text-foreground">
                  Affected User
                </span>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort("severity")}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-smooth"
                >
                  Severity
                  <Icon
                    name={
                      sortField === "severity" && sortDirection === "asc"
                        ? "ChevronUp"
                        : "ChevronDown"
                    }
                    size={16}
                  />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-semibold text-foreground">
                  Threat Type
                </span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-semibold text-foreground">
                  Detection Method
                </span>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-smooth"
                >
                  Status
                  <Icon
                    name={
                      sortField === "status" && sortDirection === "asc"
                        ? "ChevronUp"
                        : "ChevronDown"
                    }
                    size={16}
                  />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-semibold text-foreground">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {incidents?.map((incident) => {
              const severity = severityConfig?.[incident?.severity];
              const status = statusConfig?.[incident?.status];
              const isSelected = selectedIncidents?.includes(incident?.id);

              return (
                <tr
                  key={incident?.id}
                  className={`
                    transition-smooth hover:bg-muted/30 cursor-pointer
                    ${isSelected ? "bg-accent/5" : ""}
                  `}
                  onClick={() => onIncidentSelect(incident)}
                >
                  <td
                    className="px-4 py-3"
                    onClick={(e) => e?.stopPropagation()}
                  >
                    <Checkbox
                      checked={isSelected}
                      onChange={(e) =>
                        handleSelectIncident(incident?.id, e?.target?.checked)
                      }
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground whitespace-nowrap">
                      {formatTimestamp(incident?.timestamp)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-accent">
                      {incident?.incidentId}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {incident?.affectedUser}
                      </span>
                      <span className="text-xs text-muted-foreground caption">
                        {incident?.userEmail}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`
                      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium
                      ${severity?.color} ${severity?.bgColor}
                    `}
                    >
                      <Icon name={severity?.icon} size={12} />
                      {severity?.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground">
                      {incident?.threatType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">
                      {incident?.detectionMethod}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`
                      inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium
                      ${status?.color} ${status?.bgColor}
                    `}
                    >
                      {status?.label}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3"
                    onClick={(e) => e?.stopPropagation()}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onIncidentSelect(incident)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden space-y-3">
        {incidents?.map((incident) => {
          const severity = severityConfig?.[incident?.severity];
          const status = statusConfig?.[incident?.status];
          const isSelected = selectedIncidents?.includes(incident?.id);

          return (
            <div
              key={incident?.id}
              className={`
                p-4 bg-card border rounded-lg transition-smooth
                ${isSelected ? "border-accent bg-accent/5" : "border-border"}
              `}
            >
              <div className="flex items-start gap-3 mb-3">
                <Checkbox
                  checked={isSelected}
                  onChange={(e) =>
                    handleSelectIncident(incident?.id, e?.target?.checked)
                  }
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-sm font-medium text-accent">
                      {incident?.incidentId}
                    </span>
                    <span
                      className={`
                      inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium
                      ${severity?.color} ${severity?.bgColor}
                    `}
                    >
                      <Icon name={severity?.icon} size={12} />
                      {severity?.label}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    <p className="text-sm font-medium text-foreground">
                      {incident?.affectedUser}
                    </p>
                    <p className="text-xs text-muted-foreground caption">
                      {incident?.userEmail}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimestamp(incident?.timestamp)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-muted-foreground">
                      {incident?.threatType}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {incident?.detectionMethod}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`
                      inline-flex items-center px-2 py-1 rounded-md text-xs font-medium
                      ${status?.color} ${status?.bgColor}
                    `}
                    >
                      {status?.label}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onIncidentSelect(incident)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IncidentTable;
