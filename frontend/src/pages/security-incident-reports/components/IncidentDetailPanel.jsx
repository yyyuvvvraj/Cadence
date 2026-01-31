import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const IncidentDetailPanel = ({
  incident,
  onClose,
  onUpdateStatus,
  onAssign,
  onAddNote,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [newNote, setNewNote] = useState("");
  const [assignee, setAssignee] = useState(incident?.assignedTo || "");

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

  const statusOptions = [
    { value: "open", label: "Open" },
    { value: "investigating", label: "Investigating" },
    { value: "resolved", label: "Resolved" },
    { value: "false_positive", label: "False Positive" },
    { value: "escalated", label: "Escalated" },
  ];

  const assigneeOptions = [
    { value: "", label: "Unassigned" },
    { value: "john.security@company.com", label: "John Security" },
    { value: "sarah.analyst@company.com", label: "Sarah Analyst" },
    { value: "mike.admin@company.com", label: "Mike Admin" },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: "FileText" },
    { id: "timeline", label: "Timeline", icon: "Clock" },
    { id: "evidence", label: "Evidence", icon: "Database" },
    { id: "notes", label: "Notes", icon: "MessageSquare" },
  ];

  const severity = severityConfig?.[incident?.severity];

  const handleAddNote = () => {
    if (newNote?.trim()) {
      onAddNote(incident?.id, newNote);
      setNewNote("");
    }
  };

  const handleAssign = () => {
    onAssign(incident?.id, assignee);
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

  return (
    <div className="fixed inset-0 z-[300] flex items-end lg:items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full lg:max-w-4xl h-[90vh] lg:h-[85vh] bg-card border border-border lg:rounded-lg shadow-elevation-3 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div
              className={`
              flex items-center justify-center w-10 h-10 rounded-lg
              ${severity?.bgColor}
            `}
            >
              <Icon
                name={severity?.icon}
                size={20}
                color={`var(--color-${incident?.severity === "critical" ? "error" : incident?.severity === "high" ? "warning" : "accent"})`}
              />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-foreground">
                {incident?.incidentId}
              </h2>
              <p className="text-sm text-muted-foreground">
                {incident?.threatType}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted/50 transition-smooth"
            aria-label="Close panel"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 px-4 md:px-6 py-3 border-b border-border overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth whitespace-nowrap
                ${
                  activeTab === tab?.id
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              {tab?.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground caption">
                    Affected User
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {incident?.affectedUser}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {incident?.userEmail}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground caption">
                    Detection Time
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {formatTimestamp(incident?.timestamp)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground caption">
                    Severity
                  </p>
                  <span
                    className={`
                    inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium
                    ${severity?.color} ${severity?.bgColor}
                  `}
                  >
                    <Icon name={severity?.icon} size={12} />
                    {severity?.label}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground caption">
                    Detection Method
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {incident?.detectionMethod}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground caption">
                  Description
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {incident?.description}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">
                  Behavioral Deviations
                </p>
                <div className="space-y-2">
                  {incident?.behavioralDeviations?.map((deviation, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
                    >
                      <Icon
                        name="TrendingUp"
                        size={16}
                        className="text-warning mt-0.5"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {deviation?.metric}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {deviation?.deviation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">
                  Affected Systems
                </p>
                <div className="flex flex-wrap gap-2">
                  {incident?.affectedSystems?.map((system, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-md"
                    >
                      {system}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-4">
              {incident?.timeline?.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full">
                      <Icon
                        name={event?.icon}
                        size={16}
                        color="var(--color-accent)"
                      />
                    </div>
                    {index < incident?.timeline?.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground">
                        {event?.action}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap caption">
                        {formatTimestamp(event?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event?.description}
                    </p>
                    {event?.user && (
                      <p className="text-xs text-muted-foreground mt-1">
                        By: {event?.user}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "evidence" && (
            <div className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">
                  Collected Evidence
                </p>
                {incident?.evidence?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <Icon
                      name={item?.type === "log" ? "FileText" : "Image"}
                      size={20}
                      className="text-accent"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {item?.name}
                      </p>
                      <p className="text-xs text-muted-foreground caption">
                        {item?.size} • {item?.timestamp}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" iconName="Download">
                      Download
                    </Button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <Button variant="outline" iconName="Upload" fullWidth>
                  Upload Additional Evidence
                </Button>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-4">
              <div className="space-y-3">
                {incident?.notes?.map((note, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm font-medium text-foreground">
                        {note?.author}
                      </p>
                      <span className="text-xs text-muted-foreground caption">
                        {formatTimestamp(note?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {note?.content}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <Input
                  label="Add Investigation Note"
                  type="text"
                  placeholder="Enter your note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e?.target?.value)}
                />
                <Button
                  variant="default"
                  iconName="Plus"
                  onClick={handleAddNote}
                  disabled={!newNote?.trim()}
                  fullWidth
                >
                  Add Note
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 border-t border-border space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Status"
              options={statusOptions}
              value={incident?.status}
              onChange={(value) => onUpdateStatus(incident?.id, value)}
            />

            <Select
              label="Assign To"
              options={assigneeOptions}
              value={assignee}
              onChange={setAssignee}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              iconName="Save"
              onClick={handleAssign}
              fullWidth
            >
              Save Changes
            </Button>
            <Button variant="outline" iconName="FileText" fullWidth>
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailPanel;
