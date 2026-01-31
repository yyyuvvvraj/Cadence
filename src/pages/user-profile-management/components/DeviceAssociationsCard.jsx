import React from "react";
import Icon from "../../../components/AppIcon";

const DeviceAssociationsCard = ({ devices }) => {
  const deviceTypeIcons = {
    desktop: "Monitor",
    laptop: "Laptop",
    mobile: "Smartphone",
    tablet: "Tablet",
  };

  const statusConfig = {
    active: {
      label: "Active",
      color: "text-success",
      bgColor: "bg-success/10",
      icon: "CheckCircle",
    },
    inactive: {
      label: "Inactive",
      color: "text-muted-foreground",
      bgColor: "bg-muted/30",
      icon: "Circle",
    },
    blocked: {
      label: "Blocked",
      color: "text-error",
      bgColor: "bg-error/10",
      icon: "XCircle",
    },
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Smartphone" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              Device Associations
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground caption">
              {devices?.length} registered devices
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {devices?.map((device) => {
          const status = statusConfig?.[device?.status];

          return (
            <div
              key={device?.id}
              className="p-3 md:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth"
            >
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg flex-shrink-0">
                  <Icon
                    name={deviceTypeIcons?.[device?.type]}
                    size={24}
                    color="var(--color-accent)"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">
                        {device?.name}
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {device?.browser} • {device?.os}
                      </p>
                    </div>
                    <span
                      className={`
                      inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
                      ${status?.color} ${status?.bgColor}
                    `}
                    >
                      <Icon name={status?.icon} size={12} />
                      {status?.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground caption">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      <span>Added: {device?.addedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Activity" size={12} />
                      <span>Last used: {device?.lastUsed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={12} />
                      <span>{device?.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-accent/10 text-accent rounded-md text-xs font-medium hover:bg-accent/20 transition-smooth">
                      <Icon name="Eye" size={14} />
                      <span>View Details</span>
                    </button>
                    {device?.status !== "blocked" && (
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-error/10 text-error rounded-md text-xs font-medium hover:bg-error/20 transition-smooth">
                        <Icon name="Ban" size={14} />
                        <span>Block</span>
                      </button>
                    )}
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

export default DeviceAssociationsCard;
