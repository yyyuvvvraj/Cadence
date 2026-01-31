import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const QuickActions = ({ selectedEvent, onAction }) => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");

  const actions = [
    {
      id: "investigate",
      label: "Investigate Event",
      icon: "Search",
      variant: "default",
      description: "Open detailed investigation panel",
    },
    {
      id: "flag",
      label: "Flag Session",
      icon: "Flag",
      variant: "warning",
      description: "Mark session for manual review",
    },
    {
      id: "message",
      label: "Contact User",
      icon: "MessageSquare",
      variant: "outline",
      description: "Send message to affected user",
    },
    {
      id: "terminate",
      label: "Terminate Session",
      icon: "XCircle",
      variant: "destructive",
      description: "Immediately end user session",
    },
  ];

  const handleAction = (actionId) => {
    if (actionId === "message") {
      setShowMessageModal(true);
    } else {
      onAction(actionId, selectedEvent);
    }
  };

  const handleSendMessage = () => {
    onAction("message", { ...selectedEvent, message });
    setMessage("");
    setShowMessageModal(false);
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Zap" size={20} color="var(--color-accent)" />
          <h3 className="text-lg font-semibold text-foreground">
            Quick Actions
          </h3>
        </div>

        {!selectedEvent ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Icon
              name="MousePointer"
              size={48}
              color="var(--color-muted-foreground)"
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Select an event from the stream to enable quick actions
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-muted/30 rounded-lg mb-4">
              <p className="text-xs text-muted-foreground caption mb-1">
                Selected Event
              </p>
              <p className="text-sm font-medium text-foreground">
                {selectedEvent?.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedEvent?.userName}
              </p>
            </div>

            {actions?.map((action) => (
              <Button
                key={action?.id}
                variant={action?.variant}
                fullWidth
                iconName={action?.icon}
                iconPosition="left"
                onClick={() => handleAction(action?.id)}
              >
                <div className="flex flex-col items-start flex-1">
                  <span className="text-sm font-medium">{action?.label}</span>
                  <span className="text-xs opacity-80 caption">
                    {action?.description}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>
      {showMessageModal && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[400]"
            onClick={() => setShowMessageModal(false)}
          />
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">
                  Contact User
                </h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted/50 transition-smooth"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>

              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Send a message to {selectedEvent?.userName} regarding this
                  security event.
                </p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e?.target?.value)}
                  placeholder="Type your message here..."
                  rows={4}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 p-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setShowMessageModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSendMessage}
                  disabled={!message?.trim()}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QuickActions;
