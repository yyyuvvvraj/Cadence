import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const AdminControlsCard = ({ onAction }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const adminActions = [
    {
      id: "reset-baseline",
      label: "Reset Baseline",
      description: "Clear current behavioral baseline and restart learning",
      icon: "RotateCcw",
      variant: "outline",
      requiresConfirm: true,
    },
    {
      id: "manual-override",
      label: "Manual Override",
      description: "Temporarily bypass behavioral authentication",
      icon: "Shield",
      variant: "outline",
      requiresConfirm: true,
    },
    {
      id: "policy-exception",
      label: "Policy Exception",
      description: "Assign custom authentication policy",
      icon: "FileText",
      variant: "outline",
      requiresConfirm: false,
    },
    {
      id: "suspend-account",
      label: "Suspend Account",
      description: "Temporarily disable user access",
      icon: "UserX",
      variant: "destructive",
      requiresConfirm: true,
    },
    {
      id: "retrain-model",
      label: "Retrain Model",
      description: "Rebuild behavioral authentication model",
      icon: "RefreshCw",
      variant: "outline",
      requiresConfirm: true,
    },
    {
      id: "send-message",
      label: "Send Message",
      description: "Direct communication with user",
      icon: "MessageSquare",
      variant: "default",
      requiresConfirm: false,
    },
  ];

  const handleActionClick = (action) => {
    if (action?.requiresConfirm) {
      setSelectedAction(action);
      setShowConfirmDialog(true);
    } else {
      onAction?.(action?.id);
    }
  };

  const handleConfirm = () => {
    if (selectedAction) {
      onAction?.(selectedAction?.id);
    }
    setShowConfirmDialog(false);
    setSelectedAction(null);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
    setSelectedAction(null);
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Settings" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              Administrative Controls
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground caption">
              Manage user authentication settings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {adminActions?.map((action) => (
            <div
              key={action?.id}
              className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg flex-shrink-0">
                  <Icon
                    name={action?.icon}
                    size={20}
                    color="var(--color-accent)"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {action?.label}
                  </h4>
                  <p className="text-xs text-muted-foreground caption">
                    {action?.description}
                  </p>
                </div>
              </div>
              <Button
                variant={action?.variant}
                size="sm"
                fullWidth
                onClick={() => handleActionClick(action)}
                iconName={action?.icon}
                iconPosition="left"
              >
                {action?.label}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4 md:mt-6 p-4 bg-warning/5 border border-warning/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon
              name="AlertTriangle"
              size={20}
              color="var(--color-warning)"
              className="flex-shrink-0"
            />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                Audit Trail Notice
              </p>
              <p className="text-xs md:text-sm text-muted-foreground caption">
                All administrative actions are logged and require proper
                authorization. Changes may take up to 5 minutes to propagate
                across all systems.
              </p>
            </div>
          </div>
        </div>
      </div>
      {showConfirmDialog && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-elevation-3 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-lg flex-shrink-0">
                <Icon
                  name="AlertTriangle"
                  size={24}
                  color="var(--color-warning)"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Confirm Action
                </h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to perform this action:{" "}
                  <strong>{selectedAction?.label}</strong>?
                </p>
                <p className="text-xs text-muted-foreground caption mt-2">
                  {selectedAction?.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" fullWidth onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="destructive" fullWidth onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminControlsCard;
