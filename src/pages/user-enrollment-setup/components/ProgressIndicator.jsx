import React from "react";
import Icon from "../../../components/AppIcon";

const ProgressIndicator = ({ currentStep, steps, completionPercentage }) => {
  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return "completed";
    if (stepIndex === currentStep) return "active";
    return "pending";
  };

  const getStepIcon = (step, status) => {
    if (status === "completed") return "CheckCircle";
    return step?.icon;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Enrollment Progress
        </h2>
        <span className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-accent">
          {completionPercentage}%
        </span>
      </div>
      <div className="relative mb-6 md:mb-8">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {steps?.map((step, index) => {
          const status = getStepStatus(index);
          const iconName = getStepIcon(step, status);

          return (
            <div
              key={step?.id}
              className={`
                flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg transition-smooth
                ${status === "active" ? "bg-accent/10 border border-accent/30" : ""}
                ${status === "completed" ? "bg-success/10" : ""}
                ${status === "pending" ? "opacity-60" : ""}
              `}
            >
              <div
                className={`
                flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg flex-shrink-0
                ${status === "completed" ? "bg-success/20" : ""}
                ${status === "active" ? "bg-accent/20" : ""}
                ${status === "pending" ? "bg-muted" : ""}
              `}
              >
                <Icon
                  name={iconName}
                  size={20}
                  color={
                    status === "completed"
                      ? "var(--color-success)"
                      : status === "active"
                        ? "var(--color-accent)"
                        : "var(--color-muted-foreground)"
                  }
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm md:text-base font-semibold text-foreground">
                    {step?.title}
                  </h3>
                  {status === "completed" && (
                    <Icon name="Check" size={16} color="var(--color-success)" />
                  )}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                  {step?.description}
                </p>
                <div className="flex items-center gap-4 text-xs caption">
                  <span className="text-muted-foreground">
                    {step?.estimatedTime}
                  </span>
                  {step?.samplesRequired && (
                    <span className="text-muted-foreground">
                      {step?.samplesCollected || 0}/{step?.samplesRequired}{" "}
                      samples
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
