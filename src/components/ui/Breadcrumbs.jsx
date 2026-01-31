import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";

const Breadcrumbs = () => {
  const location = useLocation();

  const routeLabels = {
    "/authentication-dashboard": "Dashboard",
    "/user-enrollment-setup": "User Enrollment",
    "/real-time-monitoring": "Real Time Monitoring",
    "/behavioral-analytics": "Behavioral Analytics",
    "/security-incident-reports": "Security Incidents",
    "/user-profile-management": "User Profiles",
  };

  const pathSegments = location?.pathname?.split("/")?.filter(Boolean);

  const breadcrumbItems = pathSegments?.map((segment, index) => {
    const path = `/${pathSegments?.slice(0, index + 1)?.join("/")}`;
    const label =
      routeLabels?.[path] ||
      segment
        ?.split("-")
        ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
        ?.join(" ");

    return {
      path,
      label,
      isLast: index === pathSegments?.length - 1,
    };
  });

  if (breadcrumbItems?.length === 0) {
    return null;
  }

  return (
    <nav
      className="flex items-center gap-2 py-4 text-sm"
      aria-label="Breadcrumb"
    >
      <Link
        to="/authentication-dashboard"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-200 group"
      >
        <Icon name="Home" size={16} className="group-hover:scale-110 transition-transform duration-200" />
        <span className="hidden sm:inline font-medium">Home</span>
      </Link>
      {breadcrumbItems?.map((item, index) => (
        <React.Fragment key={item?.path}>
          <Icon
            name="ChevronRight"
            size={16}
            className="text-muted-foreground/50"
          />

          {item?.isLast ? (
            <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-400 font-semibold" aria-current="page">
              {item?.label}
            </span>
          ) : (
            <Link
              to={item?.path}
              className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-200 font-medium"
            >
              {item?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
