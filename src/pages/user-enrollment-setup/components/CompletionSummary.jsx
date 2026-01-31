import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CompletionSummary = ({ capturedData, confidenceScore }) => {
  const navigate = useNavigate();

  const getConfidenceLevel = (score) => {
    if (score >= 85)
      return { label: "Excellent", color: "text-success", icon: "CheckCircle" };
    if (score >= 70)
      return { label: "Good", color: "text-accent", icon: "CheckCircle" };
    if (score >= 50)
      return { label: "Fair", color: "text-warning", icon: "AlertTriangle" };
    return { label: "Low", color: "text-error", icon: "XCircle" };
  };

  const confidence = getConfidenceLevel(confidenceScore);

  const summaryMetrics = [
    {
      label: "Typing Samples",
      value: capturedData?.typing?.length || 0,
      icon: "Keyboard",
      color: "text-accent",
    },
    {
      label: "Mouse Patterns",
      value: capturedData?.mouse ? "1 Complete" : "0",
      icon: "MousePointer2",
      color: "text-accent",
    },
    {
      label: "Interactions",
      value: capturedData?.interaction ? "1 Complete" : "0",
      icon: "Activity",
      color: "text-accent",
    },
    {
      label: "Confidence Score",
      value: `${confidenceScore}%`,
      icon: confidence?.icon,
      color: confidence?.color,
    },
  ];

  const handleProceed = () => {
    navigate("/authentication-dashboard");
  };

  const handleRetry = () => {
    window.location?.reload();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-success/10 rounded-full mx-auto mb-4">
          <Icon name="CheckCircle" size={32} color="var(--color-success)" />
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
          Enrollment Complete!
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Your behavioral authentication baseline has been established
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
        {summaryMetrics?.map((metric, index) => (
          <div
            key={index}
            className="bg-muted/30 border border-border rounded-lg p-4 text-center"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-background rounded-lg mx-auto mb-3">
              <Icon
                name={metric?.icon}
                size={24}
                color={`var(--color-${metric?.color?.replace("text-", "")})`}
              />
            </div>
            <div className="text-xs text-muted-foreground caption mb-1">
              {metric?.label}
            </div>
            <div className={`text-lg md:text-xl font-bold ${metric?.color}`}>
              {metric?.value}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 md:p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Icon
            name="Shield"
            size={20}
            color="var(--color-accent)"
            className="flex-shrink-0 mt-0.5"
          />
          <div>
            <h3 className="text-base font-semibold text-foreground mb-2">
              Authentication Confidence: {confidence?.label}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your behavioral patterns have been analyzed and stored securely.
              The system will continuously verify your identity based on these
              patterns.
            </p>
          </div>
        </div>

        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-out ${
              confidenceScore >= 85
                ? "bg-success"
                : confidenceScore >= 70
                  ? "bg-accent"
                  : confidenceScore >= 50
                    ? "bg-warning"
                    : "bg-error"
            }`}
            style={{ width: `${confidenceScore}%` }}
          />
        </div>
      </div>
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
          <Icon
            name="Check"
            size={18}
            color="var(--color-success)"
            className="flex-shrink-0 mt-0.5"
          />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Keystroke Dynamics Captured
            </h4>
            <p className="text-xs text-muted-foreground caption">
              Typing rhythm, speed, and pressure patterns analyzed
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
          <Icon
            name="Check"
            size={18}
            color="var(--color-success)"
            className="flex-shrink-0 mt-0.5"
          />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Mouse Movement Patterns Recorded
            </h4>
            <p className="text-xs text-muted-foreground caption">
              Movement velocity, acceleration, and click patterns stored
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
          <Icon
            name="Check"
            size={18}
            color="var(--color-success)"
            className="flex-shrink-0 mt-0.5"
          />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Interaction Behaviors Established
            </h4>
            <p className="text-xs text-muted-foreground caption">
              Scroll patterns, hover behaviors, and timing captured
            </p>
          </div>
        </div>
      </div>
      <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Icon
            name="Info"
            size={18}
            color="var(--color-warning)"
            className="flex-shrink-0 mt-0.5"
          />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              What Happens Next?
            </h4>
            <p className="text-xs text-muted-foreground caption">
              The system will continuously monitor your behavioral patterns
              during each session. If unusual patterns are detected, you may be
              prompted for additional verification. Your patterns will adapt
              over time to maintain accuracy.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          variant="default"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={handleProceed}
          fullWidth
          className="sm:flex-1"
        >
          Proceed to Dashboard
        </Button>

        {confidenceScore < 70 && (
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={handleRetry}
            fullWidth
            className="sm:flex-1"
          >
            Retry Enrollment
          </Button>
        )}
      </div>
      <p className="text-xs text-center text-muted-foreground caption mt-4">
        Your behavioral data is encrypted and stored securely in compliance with
        privacy regulations
      </p>
    </div>
  );
};

export default CompletionSummary;
