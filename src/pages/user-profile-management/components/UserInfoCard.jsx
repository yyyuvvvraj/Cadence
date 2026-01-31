import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const UserInfoCard = ({ user }) => {
  const statusConfig = {
    active: {
      label: "Active",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/30",
      icon: "CheckCircle",
    },
    pending: {
      label: "Pending",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/30",
      icon: "Clock",
    },
    suspended: {
      label: "Suspended",
      color: "text-error",
      bgColor: "bg-error/10",
      borderColor: "border-error/30",
      icon: "XCircle",
    },
  };

  const currentStatus = statusConfig?.[user?.status] || statusConfig?.active;

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <Image
              src={user?.avatar}
              alt={user?.avatarAlt}
              className="w-full h-full rounded-lg object-cover"
            />
            <div
              className={`
              absolute -bottom-2 -right-2 flex items-center justify-center
              w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-card
              ${currentStatus?.bgColor} ${currentStatus?.borderColor}
            `}
            >
              <Icon
                name={currentStatus?.icon}
                size={20}
                color={`var(--color-${user?.status === "active" ? "success" : user?.status === "pending" ? "warning" : "error"})`}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
                {user?.name}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                {user?.email}
              </p>
            </div>
            <span
              className={`
              inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium
              ${currentStatus?.color} ${currentStatus?.bgColor} border ${currentStatus?.borderColor}
            `}
            >
              <Icon name={currentStatus?.icon} size={16} />
              {currentStatus?.label}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                <Icon name="Calendar" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground caption">
                  Enrolled
                </p>
                <p className="text-sm font-medium text-foreground">
                  {user?.enrolledDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                <Icon name="Activity" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground caption">
                  Last Active
                </p>
                <p className="text-sm font-medium text-foreground">
                  {user?.lastActive}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                <Icon name="Smartphone" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground caption">Devices</p>
                <p className="text-sm font-medium text-foreground">
                  {user?.deviceCount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                <Icon name="Shield" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground caption">
                  Auth Score
                </p>
                <p className="text-sm font-medium text-foreground">
                  {user?.authScore}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
