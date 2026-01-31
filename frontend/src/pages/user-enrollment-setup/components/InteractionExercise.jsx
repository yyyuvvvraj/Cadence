import React, { useState, useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const InteractionExercise = ({ onComplete, onDataCapture }) => {
  const [isActive, setIsActive] = useState(false);
  const [scrollData, setScrollData] = useState([]);
  const [clickPatterns, setClickPatterns] = useState([]);
  const [hoverData, setHoverData] = useState([]);
  const [interactionScore, setInteractionScore] = useState(0);
  const containerRef = useRef(null);
  const startTimeRef = useRef(null);
  const lastScrollTimeRef = useRef(null);

  const interactionElements = [
    { id: 1, type: "button", label: "Click Me", icon: "MousePointer2" },
    { id: 2, type: "button", label: "Tap Here", icon: "Hand" },
    { id: 3, type: "button", label: "Press This", icon: "Fingerprint" },
    { id: 4, type: "card", label: "Hover Over Card", icon: "Square" },
    { id: 5, type: "card", label: "Move Mouse Here", icon: "Move" },
    { id: 6, type: "button", label: "Final Click", icon: "CheckCircle" },
  ];

  const [elementStates, setElementStates] = useState(
    interactionElements?.map((el) => ({
      ...el,
      interacted: false,
      hoverTime: 0,
    })),
  );

  useEffect(() => {
    if (isActive) {
      startTimeRef.current = Date.now();
      lastScrollTimeRef.current = Date.now();
    }
  }, [isActive]);

  useEffect(() => {
    const interactedCount = elementStates?.filter(
      (el) => el?.interacted,
    )?.length;
    const score = Math.round((interactedCount / elementStates?.length) * 100);
    setInteractionScore(score);

    if (score === 100) {
      setTimeout(() => handleExerciseComplete(), 1000);
    }
  }, [elementStates]);

  const handleScroll = (e) => {
    if (!isActive) return;

    const currentTime = Date.now();
    const timeSinceLastScroll = lastScrollTimeRef?.current
      ? currentTime - lastScrollTimeRef?.current
      : 0;

    const scrollInfo = {
      scrollTop: e?.target?.scrollTop,
      scrollHeight: e?.target?.scrollHeight,
      clientHeight: e?.target?.clientHeight,
      timestamp: currentTime,
      timeSinceStart: currentTime - startTimeRef?.current,
      timeSinceLastScroll,
      velocity:
        timeSinceLastScroll > 0
          ? Math.abs(
              e?.target?.scrollTop -
                (scrollData?.[scrollData?.length - 1]?.scrollTop || 0),
            ) / timeSinceLastScroll
          : 0,
    };

    setScrollData((prev) => [...prev, scrollInfo]);
    lastScrollTimeRef.current = currentTime;
  };

  const handleElementClick = (elementId) => {
    if (!isActive) return;

    const clickInfo = {
      elementId,
      timestamp: Date.now(),
      timeSinceStart: Date.now() - startTimeRef?.current,
      type: "click",
    };

    setClickPatterns((prev) => [...prev, clickInfo]);
    setElementStates((prev) =>
      prev?.map((el) =>
        el?.id === elementId ? { ...el, interacted: true } : el,
      ),
    );
  };

  const handleElementHover = (elementId, isEntering) => {
    if (!isActive) return;

    const hoverInfo = {
      elementId,
      timestamp: Date.now(),
      timeSinceStart: Date.now() - startTimeRef?.current,
      type: isEntering ? "enter" : "leave",
    };

    setHoverData((prev) => [...prev, hoverInfo]);

    if (!isEntering) {
      const enterEvent = hoverData
        ?.filter((h) => h?.elementId === elementId && h?.type === "enter")
        ?.pop();
      if (enterEvent) {
        const hoverDuration = Date.now() - enterEvent?.timestamp;
        if (hoverDuration > 500) {
          setElementStates((prev) =>
            prev?.map((el) =>
              el?.id === elementId
                ? { ...el, interacted: true, hoverTime: hoverDuration }
                : el,
            ),
          );
        }
      }
    }
  };

  const handleExerciseComplete = () => {
    const exerciseData = {
      scrollData,
      clickPatterns,
      hoverData,
      interactionScore,
      completionTime: Date.now() - startTimeRef?.current,
      totalInteractions: clickPatterns?.length + hoverData?.length,
      averageScrollVelocity:
        scrollData?.length > 0
          ? scrollData?.reduce((sum, s) => sum + s?.velocity, 0) /
            scrollData?.length
          : 0,
    };

    onDataCapture(exerciseData);
    onComplete();
  };

  const handleStart = () => {
    setIsActive(true);
    setScrollData([]);
    setClickPatterns([]);
    setHoverData([]);
    setInteractionScore(0);
    setElementStates(
      interactionElements?.map((el) => ({
        ...el,
        interacted: false,
        hoverTime: 0,
      })),
    );
  };

  const handleRestart = () => {
    setIsActive(false);
    setTimeout(() => handleStart(), 100);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg">
            <Icon name="Activity" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Interaction Pattern Analysis
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground caption">
              Complete all interactions
            </p>
          </div>
        </div>

        {isActive && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-muted-foreground caption">Score</div>
              <div className="text-lg md:text-xl font-bold text-accent">
                {interactionScore}%
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-4 md:space-y-6">
        <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon
              name="Info"
              size={18}
              color="var(--color-accent)"
              className="flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-sm text-foreground mb-2">
                Interact with all elements below. Click buttons and hover over
                cards for at least 0.5 seconds. Scroll naturally through the
                content.
              </p>
              <p className="text-xs text-muted-foreground caption">
                Estimated time: 30-45 seconds
              </p>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="relative h-64 md:h-80 lg:h-96 overflow-y-auto bg-background border border-border rounded-lg p-4"
        >
          {!isActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
              <div className="text-center">
                <Icon
                  name="Activity"
                  size={48}
                  color="var(--color-muted-foreground)"
                  className="mx-auto mb-4"
                />
                <p className="text-sm text-muted-foreground">
                  Click "Start Exercise" to begin
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {elementStates?.map((element) => (
              <div key={element?.id}>
                {element?.type === "button" ? (
                  <button
                    onClick={() => handleElementClick(element?.id)}
                    disabled={!isActive || element?.interacted}
                    className={`
                      w-full flex items-center justify-between p-4 rounded-lg transition-smooth
                      ${
                        element?.interacted
                          ? "bg-success/10 border-2 border-success cursor-not-allowed"
                          : "bg-muted/50 border-2 border-border hover:border-accent hover:bg-accent/5"
                      }
                      ${!isActive ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        name={element?.icon}
                        size={20}
                        color={
                          element?.interacted
                            ? "var(--color-success)"
                            : "var(--color-foreground)"
                        }
                      />
                      <span
                        className={`text-sm font-medium ${element?.interacted ? "text-success" : "text-foreground"}`}
                      >
                        {element?.label}
                      </span>
                    </div>
                    {element?.interacted && (
                      <Icon
                        name="CheckCircle"
                        size={20}
                        color="var(--color-success)"
                      />
                    )}
                  </button>
                ) : (
                  <div
                    onMouseEnter={() => handleElementHover(element?.id, true)}
                    onMouseLeave={() => handleElementHover(element?.id, false)}
                    className={`
                      w-full flex items-center justify-between p-4 rounded-lg transition-smooth
                      ${
                        element?.interacted
                          ? "bg-success/10 border-2 border-success"
                          : "bg-muted/50 border-2 border-border hover:border-accent hover:bg-accent/5"
                      }
                      ${!isActive ? "opacity-50" : ""}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        name={element?.icon}
                        size={20}
                        color={
                          element?.interacted
                            ? "var(--color-success)"
                            : "var(--color-foreground)"
                        }
                      />
                      <span
                        className={`text-sm font-medium ${element?.interacted ? "text-success" : "text-foreground"}`}
                      >
                        {element?.label}
                      </span>
                    </div>
                    {element?.interacted && (
                      <Icon
                        name="CheckCircle"
                        size={20}
                        color="var(--color-success)"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="h-32 flex items-center justify-center text-sm text-muted-foreground">
              Scroll to explore all interaction elements
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {!isActive ? (
            <Button
              variant="default"
              iconName="Play"
              iconPosition="left"
              onClick={handleStart}
              fullWidth
              className="sm:flex-1"
            >
              Start Exercise
            </Button>
          ) : (
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={handleRestart}
              fullWidth
              className="sm:flex-1"
            >
              Restart
            </Button>
          )}

          <Button
            variant="ghost"
            iconName="SkipForward"
            iconPosition="left"
            onClick={onComplete}
            fullWidth
            className="sm:flex-1"
          >
            Skip Exercise
          </Button>
        </div>

        {(scrollData?.length > 0 || clickPatterns?.length > 0) && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-xs text-muted-foreground caption mb-1">
                Scrolls
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {scrollData?.length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground caption mb-1">
                Clicks
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {clickPatterns?.length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground caption mb-1">
                Hovers
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {hoverData?.filter((h) => h?.type === "enter")?.length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground caption mb-1">
                Progress
              </div>
              <div className="text-base md:text-lg font-semibold text-success">
                {interactionScore}%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionExercise;
