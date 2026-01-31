import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import { useDarkMode } from "../../contexts/DarkModeContext";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navigationSections = [
    {
      label: "Dashboard",
      items: [
        {
          label: "Dashboard",
          path: "/authentication-dashboard",
          icon: "Shield",
          description: "Real-time authentication monitoring",
        },
      ],
    },
    {
      label: "Monitoring",
      items: [
        {
          label: "Real Time",
          path: "/real-time-monitoring",
          icon: "Activity",
          description: "Live event tracking",
        },
      ],
    },
    {
      label: "Users",
      items: [
        {
          label: "Profiles",
          path: "/user-profile-management",
          icon: "Users",
          description: "User management",
        },
        {
          label: "Enrollment",
          path: "/user-enrollment-setup",
          icon: "UserPlus",
          description: "New user setup",
        },
      ],
    },
    {
      label: "Analytics",
      items: [
        {
          label: "Behavioral",
          path: "/behavioral-analytics",
          icon: "TrendingUp",
          description: "Pattern analysis",
        },
        {
          label: "Incidents",
          path: "/security-incident-reports",
          icon: "AlertTriangle",
          description: "Security reports",
        },
      ],
    },
  ];

  const isActiveSection = (section) => {
    return section?.items?.some((item) => location?.pathname === item?.path);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-elevation-1">
      <div className="flex items-center justify-between h-[70px] px-6">
        <div className="flex items-center gap-8">
          <Link
            to="/authentication-dashboard"
            className="flex items-center gap-3 transition-all duration-300 hover:opacity-80 group"
            onClick={closeMobileMenu}
          >
            <div className="flex items-center justify-center w-11 h-11 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl shadow-glow-sm group-hover:shadow-glow transition-all duration-300">
              <Icon name="Fingerprint" size={24} color="#ffffff" />
            </div>
            <span className="text-xl font-heading font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              BiometricAuth
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navigationSections?.map((section, sectionIndex) => (
              <div key={sectionIndex} className="relative group">
                <button
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300
                    ${isActiveSection(section)
                      ? "bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-400 shadow-glow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }
                  `}
                >
                  <span className="font-medium text-sm">{section?.label}</span>
                  {section?.items?.length > 1 && (
                    <Icon name="ChevronDown" size={16} className="transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </button>

                {section?.items?.length > 1 && (
                  <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <div className="bg-popover/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-elevation-3 py-2 min-w-[240px]">
                      {section?.items?.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          to={item?.path}
                          className={`
                            flex items-center gap-3 px-4 py-3 transition-all duration-200
                            ${isActivePath(item?.path)
                              ? "bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-400"
                              : "text-popover-foreground hover:bg-muted/50 hover:text-foreground"
                            }
                          `}
                        >
                          <div className={`p-1.5 rounded-lg ${isActivePath(item?.path) ? 'bg-primary-500/20' : 'bg-muted/50'}`}>
                            <Icon name={item?.icon} size={18} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {item?.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {item?.description}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {section?.items?.length === 1 && (
                  <Link
                    to={section?.items?.[0]?.path}
                    className="absolute inset-0"
                    aria-label={section?.items?.[0]?.label}
                  />
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/50 text-foreground transition-all duration-300 hover:bg-gradient-to-br hover:from-primary-500/20 hover:to-accent-500/20 hover:shadow-glow-sm"
            aria-label="Toggle dark mode"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <Icon name={isDarkMode ? "Sun" : "Moon"} size={20} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-muted/50 text-foreground transition-all duration-300 hover:bg-gradient-to-br hover:from-primary-500/20 hover:to-accent-500/20"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-xl border-t border-border/50 animate-slide-in-right">
          <nav className="py-4 px-6 space-y-1">
            {navigationSections?.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-1">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                  {section?.label}
                </div>
                {section?.items?.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                      ${isActivePath(item?.path)
                        ? "bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-400 shadow-glow-sm"
                        : "text-foreground hover:bg-muted/50"
                      }
                    `}
                  >
                    <div className={`p-1.5 rounded-lg ${isActivePath(item?.path) ? 'bg-primary-500/20' : 'bg-muted/50'}`}>
                      <Icon name={item?.icon} size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item?.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {item?.description}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
