import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const AuthenticationTimeline = ({ events }) => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  const eventTypeConfig = {
    success: {
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/30",
    },
    failed: {
      icon: "XCircle",
      color: "text-error",
      bgColor: "bg-error/10",
      borderColor: "border-error/30",
    },
    warning: {
      icon: "AlertTriangle",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/30",
    },
    info: {
      icon: "Info",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
    },
  };

  const toggleEvent = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="Clock" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            Authentication Timeline
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground caption">
            Recent authentication events
          </p>
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-4 md:left-5 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-4 md:space-y-6">
          {events?.map((event, index) => {
            const config = eventTypeConfig?.[event?.type];
            const isExpanded = expandedEvent === event?.id;

            return (
              <div key={event?.id} className="relative pl-10 md:pl-12">
                <div
                  className={`
                  absolute left-0 flex items-center justify-center
                  w-8 h-8 md:w-10 md:h-10 rounded-lg border-2 border-card
                  ${config?.bgColor} ${config?.borderColor}
                `}
                >
                  <Icon
                    name={config?.icon}
                    size={16}
                    color={`var(--color-${event?.type === "success" ? "success" : event?.type === "failed" ? "error" : event?.type === "warning" ? "warning" : "accent"})`}
                  />
                </div>
                <div className="bg-muted/30 rounded-lg p-3 md:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">
                        {event?.title}
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {event?.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleEvent(event?.id)}
                      className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-smooth whitespace-nowrap"
                    >
                      <span>{isExpanded ? "Less" : "More"}</span>
                      <Icon
                        name={isExpanded ? "ChevronUp" : "ChevronDown"}
                        size={14}
                      />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-muted-foreground caption">
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      <span>{event?.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={12} />
                      <span>{event?.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Smartphone" size={12} />
                      <span>{event?.device}</span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground caption mb-1">
                            IP Address
                          </p>
                          <p className="text-sm text-foreground font-mono">
                            {event?.details?.ipAddress}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground caption mb-1">
                            Browser
                          </p>
                          <p className="text-sm text-foreground">
                            {event?.details?.browser}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground caption mb-1">
                            Auth Method
                          </p>
                          <p className="text-sm text-foreground">
                            {event?.details?.authMethod}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground caption mb-1">
                            Confidence Score
                          </p>
                          <p className="text-sm text-foreground">
                            {event?.details?.confidenceScore}%
                          </p>
                        </div>
                      </div>
                      {event?.details?.notes && (
                        <div className="p-2 bg-muted/50 rounded text-xs text-muted-foreground caption">
                          {event?.details?.notes}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationTimeline;
