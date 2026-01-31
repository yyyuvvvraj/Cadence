import React, { useState } from "react";
import Icon from "../AppIcon";

const UserContextIndicator = ({
  userName = "John Doe",
  userEmail = "john.doe@company.com",
  enrollmentStatus = "active",
  lastActivity = "2026-01-28 13:45:00",
  onViewProfile,
  onEditUser,
  onViewActivity,
  onManageAccess,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const statusConfig = {
    active: {
      label: "Active",
      color: "text-white",
      bgColor: "bg-gradient-success",
      icon: "CheckCircle",
      pulse: true,
    },
    pending: {
      label: "Pending",
      color: "text-white",
      bgColor: "bg-gradient-to-r from-warning-500 to-orange-500",
      icon: "Clock",
      pulse: false,
    },
    suspended: {
      label: "Suspended",
      color: "text-white",
      bgColor: "bg-gradient-danger",
      icon: "XCircle",
      pulse: false,
    },
  };

  const currentStatus =
    statusConfig?.[enrollmentStatus] || statusConfig?.active;

  const formatLastActivity = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date?.toLocaleDateString();
  };

  const quickActions = [
    { label: "View Profile", icon: "User", onClick: onViewProfile },
    { label: "Edit User", icon: "Edit", onClick: onEditUser },
    { label: "View Activity", icon: "Activity", onClick: onViewActivity },
    { label: "Manage Access", icon: "Key", onClick: onManageAccess },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleActionClick = (action) => {
    if (action?.onClick) {
      action?.onClick();
    }
    setMenuOpen(false);
  };

  return (
    <div className="relative">
      <div className="group flex items-center gap-4 p-5 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-white/10 rounded-xl hover:shadow-glow-sm transition-all duration-300">
        {/* Avatar with gradient border */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl shadow-glow-sm">
            <Icon name="User" size={28} color="#ffffff" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="text-base font-bold text-foreground truncate">
              {userName}
            </h3>
            <span
              className={`
              inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold
              ${currentStatus?.color} ${currentStatus?.bgColor} shadow-sm
              ${currentStatus?.pulse ? 'animate-pulse-glow' : ''}
            `}
            >
              <Icon name={currentStatus?.icon} size={14} />
              {currentStatus?.label}
            </span>
          </div>

          <p className="text-sm text-muted-foreground truncate mb-2">
            {userEmail}
          </p>

          <div className="flex items-center gap-1.5 px-2 py-1 bg-muted/30 rounded-md text-xs text-muted-foreground w-fit">
            <Icon name="Clock" size={14} />
            <span className="font-medium">Last activity: {formatLastActivity(lastActivity)}</span>
          </div>
        </div>

        <button
          onClick={toggleMenu}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/50 text-foreground transition-all duration-300 hover:bg-gradient-to-br hover:from-primary-500/20 hover:to-accent-500/20 hover:shadow-glow-sm"
          aria-label="Quick actions menu"
          aria-expanded={menuOpen}
        >
          <Icon name="MoreVertical" size={20} />
        </button>
      </div>
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-[150]"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="absolute top-full right-0 mt-2 z-[200] bg-popover/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-elevation-3 py-2 min-w-[220px] animate-scale-in">
            {quickActions?.map((action, index) => (
              <button
                key={index}
                onClick={() => handleActionClick(action)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-popover-foreground hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-accent-500/10 hover:text-primary-400 transition-all duration-200 group"
              >
                <div className="p-1.5 rounded-lg bg-muted/50 group-hover:bg-primary-500/20 transition-colors duration-200">
                  <Icon name={action?.icon} size={18} />
                </div>
                <span className="font-medium">{action?.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserContextIndicator;
