import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";
import Button from "../../../components/ui/Button";

const AlertConfiguration = ({ onSave }) => {
  const [config, setConfig] = useState({
    confidenceThreshold: 75,
    anomalyThreshold: 85,
    emailNotifications: true,
    smsNotifications: false,
    slackNotifications: true,
    notificationFrequency: "immediate",
    autoTerminate: false,
    autoTerminateThreshold: 50,
  });

  const frequencyOptions = [
    { value: "immediate", label: "Immediate" },
    { value: "every_5min", label: "Every 5 minutes" },
    { value: "every_15min", label: "Every 15 minutes" },
    { value: "hourly", label: "Hourly" },
    { value: "daily", label: "Daily digest" },
  ];

  const handleSave = () => {
    onSave(config);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Settings" size={20} color="var(--color-accent)" />
        <h3 className="text-lg font-semibold text-foreground">
          Alert Configuration
        </h3>
      </div>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">
            Threshold Settings
          </h4>
          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Confidence Score Threshold</span>
                <span className="font-medium text-foreground">
                  {config?.confidenceThreshold}%
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={config?.confidenceThreshold}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    confidenceThreshold: parseInt(e?.target?.value),
                  })
                }
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Anomaly Detection Threshold</span>
                <span className="font-medium text-foreground">
                  {config?.anomalyThreshold}%
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={config?.anomalyThreshold}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    anomalyThreshold: parseInt(e?.target?.value),
                  })
                }
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">
            Notification Channels
          </h4>
          <div className="space-y-3">
            <Checkbox
              label="Email Notifications"
              description="Receive alerts via email"
              checked={config?.emailNotifications}
              onChange={(e) =>
                setConfig({ ...config, emailNotifications: e?.target?.checked })
              }
            />
            <Checkbox
              label="SMS Notifications"
              description="Receive alerts via SMS"
              checked={config?.smsNotifications}
              onChange={(e) =>
                setConfig({ ...config, smsNotifications: e?.target?.checked })
              }
            />
            <Checkbox
              label="Slack Notifications"
              description="Receive alerts in Slack"
              checked={config?.slackNotifications}
              onChange={(e) =>
                setConfig({ ...config, slackNotifications: e?.target?.checked })
              }
            />
          </div>
        </div>

        <div>
          <Select
            label="Notification Frequency"
            description="How often to send alert notifications"
            options={frequencyOptions}
            value={config?.notificationFrequency}
            onChange={(value) =>
              setConfig({ ...config, notificationFrequency: value })
            }
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">
            Automated Actions
          </h4>
          <Checkbox
            label="Auto-terminate suspicious sessions"
            description="Automatically end sessions below confidence threshold"
            checked={config?.autoTerminate}
            onChange={(e) =>
              setConfig({ ...config, autoTerminate: e?.target?.checked })
            }
          />
          {config?.autoTerminate && (
            <div className="mt-4 ml-6">
              <label className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Auto-terminate Threshold</span>
                <span className="font-medium text-foreground">
                  {config?.autoTerminateThreshold}%
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={config?.autoTerminateThreshold}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    autoTerminateThreshold: parseInt(e?.target?.value),
                  })
                }
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <Button
            variant="default"
            fullWidth
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
          >
            Save Configuration
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() =>
              setConfig({
                confidenceThreshold: 75,
                anomalyThreshold: 85,
                emailNotifications: true,
                smsNotifications: false,
                slackNotifications: true,
                notificationFrequency: "immediate",
                autoTerminate: false,
                autoTerminateThreshold: 50,
              })
            }
          >
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertConfiguration;
