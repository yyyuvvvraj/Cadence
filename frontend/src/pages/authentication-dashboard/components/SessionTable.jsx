import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const SessionTable = ({
  sessions,
  onTerminateSession,
  onInvestigate,
  onViewDetails,
}) => {
  const [sortField, setSortField] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");
  const [expandedRow, setExpandedRow] = useState(null);

  const riskConfig = {
    critical: {
      color: "text-error",
      bgColor: "bg-error/10",
      label: "Critical",
    },
    high: { color: "text-warning", bgColor: "bg-warning/10", label: "High" },
    medium: { color: "text-accent", bgColor: "bg-accent/10", label: "Medium" },
    low: { color: "text-success", bgColor: "bg-success/10", label: "Low" },
  };

  const statusConfig = {
    active: {
      color: "text-success",
      bgColor: "bg-success/10",
      icon: "CheckCircle",
      label: "Active",
    },
    suspicious: {
      color: "text-warning",
      bgColor: "bg-warning/10",
      icon: "AlertTriangle",
      label: "Suspicious",
    },
    terminated: {
      color: "text-error",
      bgColor: "bg-error/10",
      icon: "XCircle",
      label: "Terminated",
    },
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedSessions = [...sessions]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (sortField === "timestamp") {
      aValue = new Date(aValue)?.getTime();
      bValue = new Date(bValue)?.getTime();
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const toggleRow = (sessionId) => {
    setExpandedRow(expandedRow === sessionId ? null : sessionId);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <Icon name="ChevronsUpDown" size={14} />;
    return (
      <Icon
        name={sortDirection === "asc" ? "ChevronUp" : "ChevronDown"}
        size={14}
      />
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort("userName")}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-smooth"
                >
                  User
                  <SortIcon field="userName" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort("confidenceScore")}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-smooth"
                >
                  Confidence
                  <SortIcon field="confidenceScore" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort("riskLevel")}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-smooth"
                >
                  Risk Level
                  <SortIcon field="riskLevel" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-smooth"
                >
                  Status
                  <SortIcon field="status" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort("timestamp")}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-smooth"
                >
                  Last Activity
                  <SortIcon field="timestamp" />
                </button>
              </th>
              <th className="text-right px-4 py-3">
                <span className="text-sm font-semibold text-foreground">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedSessions?.map((session) => {
              const risk = riskConfig?.[session?.riskLevel];
              const status = statusConfig?.[session?.status];

              return (
                <tr
                  key={session?.id}
                  className="hover:bg-muted/20 transition-smooth"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                        <Icon
                          name="User"
                          size={20}
                          color="var(--color-accent)"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {session?.userName}
                        </p>
                        <p className="text-xs text-muted-foreground caption">
                          {session?.department}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted/30 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-accent rounded-full h-2 transition-smooth"
                          style={{ width: `${session?.confidenceScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground whitespace-nowrap">
                        {session?.confidenceScore}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${risk?.color} ${risk?.bgColor}`}
                    >
                      {risk?.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${status?.color} ${status?.bgColor}`}
                    >
                      <Icon name={status?.icon} size={12} />
                      {status?.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatTime(session?.timestamp)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onViewDetails(session?.id)}
                      >
                        View
                      </Button>
                      {session?.status === "suspicious" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          iconName="XCircle"
                          onClick={() => onTerminateSession(session?.id)}
                        >
                          Terminate
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {sortedSessions?.map((session) => {
          const risk = riskConfig?.[session?.riskLevel];
          const status = statusConfig?.[session?.status];
          const isExpanded = expandedRow === session?.id;

          return (
            <div key={session?.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg flex-shrink-0">
                    <Icon name="User" size={20} color="var(--color-accent)" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {session?.userName}
                    </p>
                    <p className="text-xs text-muted-foreground caption">
                      {session?.department}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleRow(session?.id)}
                  className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted/50 transition-smooth flex-shrink-0"
                >
                  <Icon
                    name={isExpanded ? "ChevronUp" : "ChevronDown"}
                    size={18}
                  />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground caption mb-1">
                    Confidence
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted/30 rounded-full h-2">
                      <div
                        className="bg-accent rounded-full h-2 transition-smooth"
                        style={{ width: `${session?.confidenceScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground whitespace-nowrap">
                      {session?.confidenceScore}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground caption mb-1">
                    Risk Level
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${risk?.color} ${risk?.bgColor}`}
                  >
                    {risk?.label}
                  </span>
                </div>
              </div>
              {isExpanded && (
                <div className="space-y-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground caption">
                      Status
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${status?.color} ${status?.bgColor}`}
                    >
                      <Icon name={status?.icon} size={12} />
                      {status?.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground caption">
                      Last Activity
                    </span>
                    <span className="text-xs text-foreground">
                      {formatTime(session?.timestamp)}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      fullWidth
                      onClick={() => onViewDetails(session?.id)}
                    >
                      View Details
                    </Button>
                    {session?.status === "suspicious" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        iconName="XCircle"
                        fullWidth
                        onClick={() => onTerminateSession(session?.id)}
                      >
                        Terminate
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SessionTable;
