import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const MetricsDataTable = ({ data, onUserClick }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "userName",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig?.key === key && sortConfig?.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const sortedData = [...data]?.sort((a, b) => {
    if (sortConfig?.direction === "asc") {
      return a?.[sortConfig?.key] > b?.[sortConfig?.key] ? 1 : -1;
    }
    return a?.[sortConfig?.key] < b?.[sortConfig?.key] ? 1 : -1;
  });

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData?.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getStatusColor = (score) => {
    if (score >= 90) return "text-success bg-success/10";
    if (score >= 75) return "text-accent bg-accent/10";
    if (score >= 60) return "text-warning bg-warning/10";
    return "text-error bg-error/10";
  };

  const columns = [
    { key: "userName", label: "User Name", sortable: true },
    {
      key: "typingRhythm",
      label: "Typing Rhythm",
      sortable: true,
      suffix: "%",
    },
    {
      key: "mouseConsistency",
      label: "Mouse Consistency",
      sortable: true,
      suffix: "%",
    },
    {
      key: "clickPattern",
      label: "Click Pattern",
      sortable: true,
      suffix: "%",
    },
    {
      key: "sessionDuration",
      label: "Avg Session",
      sortable: true,
      suffix: " min",
    },
    {
      key: "confidenceScore",
      label: "Confidence",
      sortable: true,
      suffix: "%",
    },
    { key: "anomalyCount", label: "Anomalies", sortable: true },
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Table" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              User Behavioral Metrics
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground caption">
              Detailed analysis of {data?.length} users
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/50 transition-smooth"
                  onClick={() => column?.sortable && handleSort(column?.key)}
                >
                  <div className="flex items-center gap-2">
                    {column?.label}
                    {column?.sortable && (
                      <Icon
                        name={
                          sortConfig?.key === column?.key &&
                          sortConfig?.direction === "desc"
                            ? "ChevronDown"
                            : "ChevronUp"
                        }
                        size={14}
                        className={
                          sortConfig?.key === column?.key
                            ? "text-accent"
                            : "text-muted-foreground"
                        }
                      />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData?.map((user) => (
              <tr
                key={user?.userId}
                className="hover:bg-muted/30 transition-smooth cursor-pointer"
                onClick={() => onUserClick && onUserClick(user)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full">
                      <Icon name="User" size={16} color="var(--color-accent)" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {user?.userName}
                      </div>
                      <div className="text-xs text-muted-foreground caption">
                        {user?.userEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getStatusColor(user?.typingRhythm)}`}
                  >
                    {user?.typingRhythm}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getStatusColor(user?.mouseConsistency)}`}
                  >
                    {user?.mouseConsistency}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getStatusColor(user?.clickPattern)}`}
                  >
                    {user?.clickPattern}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {user?.sessionDuration} min
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getStatusColor(user?.confidenceScore)}`}
                  >
                    {user?.confidenceScore}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${user?.anomalyCount > 5 ? "text-error bg-error/10" : "text-muted-foreground bg-muted/30"}`}
                  >
                    {user?.anomalyCount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onUserClick && onUserClick(user);
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden divide-y divide-border">
        {paginatedData?.map((user) => (
          <div
            key={user?.userId}
            className="p-4 hover:bg-muted/30 transition-smooth cursor-pointer"
            onClick={() => onUserClick && onUserClick(user)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full">
                  <Icon name="User" size={20} color="var(--color-accent)" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {user?.userName}
                  </div>
                  <div className="text-xs text-muted-foreground caption">
                    {user?.userEmail}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="ExternalLink"
                onClick={(e) => {
                  e?.stopPropagation();
                  onUserClick && onUserClick(user);
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-muted-foreground caption mb-1">
                  Typing Rhythm
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${getStatusColor(user?.typingRhythm)}`}
                >
                  {user?.typingRhythm}%
                </span>
              </div>
              <div>
                <div className="text-xs text-muted-foreground caption mb-1">
                  Mouse Consistency
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${getStatusColor(user?.mouseConsistency)}`}
                >
                  {user?.mouseConsistency}%
                </span>
              </div>
              <div>
                <div className="text-xs text-muted-foreground caption mb-1">
                  Click Pattern
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${getStatusColor(user?.clickPattern)}`}
                >
                  {user?.clickPattern}%
                </span>
              </div>
              <div>
                <div className="text-xs text-muted-foreground caption mb-1">
                  Confidence
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${getStatusColor(user?.confidenceScore)}`}
                >
                  {user?.confidenceScore}%
                </span>
              </div>
              <div>
                <div className="text-xs text-muted-foreground caption mb-1">
                  Avg Session
                </div>
                <div className="text-sm text-foreground">
                  {user?.sessionDuration} min
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground caption mb-1">
                  Anomalies
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${user?.anomalyCount > 5 ? "text-error bg-error/10" : "text-muted-foreground bg-muted/30"}`}
                >
                  {user?.anomalyCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-6 border-t border-border">
        <div className="text-xs md:text-sm text-muted-foreground caption">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, sortedData?.length)} of{" "}
          {sortedData?.length} users
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`
                    w-8 h-8 rounded-md text-sm font-medium transition-smooth
                    ${
                      currentPage === pageNum
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted/50"
                    }
                  `}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            iconPosition="right"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MetricsDataTable;
