import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const BehavioralVisualization = ({
  selectedUser,
  keystrokeData,
  mouseData,
}) => {
  const [activeTab, setActiveTab] = useState("keystroke");

  const tabs = [
    { id: "keystroke", label: "Keystroke Dynamics", icon: "Keyboard" },
    { id: "mouse", label: "Mouse Movement", icon: "Mouse" },
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="border-b border-border">
        <div className="flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
              <Icon name="Activity" size={20} color="var(--color-accent)" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
                Behavioral Pattern Analysis
              </h3>
              {selectedUser && (
                <p className="text-sm text-muted-foreground caption">
                  {selectedUser?.name} - {selectedUser?.department}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex overflow-x-auto border-t border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center gap-2 px-4 md:px-6 py-3 text-sm font-medium transition-smooth flex-shrink-0
                ${
                  activeTab === tab?.id
                    ? "text-accent border-b-2 border-accent bg-accent/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="whitespace-nowrap">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 md:p-6">
        {!selectedUser ? (
          <div className="flex flex-col items-center justify-center py-12 md:py-16">
            <Icon
              name="UserX"
              size={48}
              color="var(--color-muted-foreground)"
            />
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Select a user session from the table to view behavioral patterns
            </p>
          </div>
        ) : (
          <>
            {activeTab === "keystroke" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/20 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground caption mb-1">
                      Avg. Typing Speed
                    </p>
                    <p className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                      {keystrokeData?.avgSpeed} WPM
                    </p>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground caption mb-1">
                      Rhythm Consistency
                    </p>
                    <p className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                      {keystrokeData?.consistency}%
                    </p>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground caption mb-1">
                      Pattern Match
                    </p>
                    <p className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                      {keystrokeData?.patternMatch}%
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Keystroke Timing Distribution
                  </h4>
                  <div className="flex items-end gap-2 h-32 md:h-40">
                    {keystrokeData?.timingDistribution?.map((value, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <div
                          className="w-full bg-accent/20 rounded-t-md transition-smooth hover:bg-accent/30"
                          style={{ height: `${value}%` }}
                        />
                        <span className="text-xs text-muted-foreground caption">
                          {index * 50}ms
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Anomaly Detection
                  </h4>
                  <div className="space-y-2">
                    {keystrokeData?.anomalies?.map((anomaly, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            name="AlertTriangle"
                            size={16}
                            color="var(--color-warning)"
                          />
                          <span className="text-sm text-foreground">
                            {anomaly?.description}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground caption whitespace-nowrap">
                          {anomaly?.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "mouse" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/20 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground caption mb-1">
                      Avg. Speed
                    </p>
                    <p className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                      {mouseData?.avgSpeed} px/s
                    </p>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground caption mb-1">
                      Click Accuracy
                    </p>
                    <p className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                      {mouseData?.clickAccuracy}%
                    </p>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground caption mb-1">
                      Pattern Match
                    </p>
                    <p className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                      {mouseData?.patternMatch}%
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Movement Heatmap
                  </h4>
                  <div className="bg-muted/10 rounded-lg p-4 aspect-video relative overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-1 p-4">
                      {mouseData?.heatmap?.map((intensity, index) => (
                        <div
                          key={index}
                          className="rounded-sm transition-smooth"
                          style={{
                            backgroundColor: `rgba(6, 182, 212, ${intensity / 100})`,
                            opacity: intensity > 0 ? 1 : 0.1,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground caption mt-2 text-center">
                    Darker areas indicate higher mouse activity concentration
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Movement Patterns
                  </h4>
                  <div className="space-y-2">
                    {mouseData?.patterns?.map((pattern, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            name="TrendingUp"
                            size={16}
                            color="var(--color-accent)"
                          />
                          <span className="text-sm text-foreground">
                            {pattern?.description}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-accent">
                          {pattern?.frequency}x
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BehavioralVisualization;
