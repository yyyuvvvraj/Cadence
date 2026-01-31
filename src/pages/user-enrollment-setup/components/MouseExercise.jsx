import React, { useState, useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const MouseExercise = ({ onComplete, onDataCapture }) => {
  const [isActive, setIsActive] = useState(false);
  const [targets, setTargets] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [mouseData, setMouseData] = useState([]);
  const [clickData, setClickData] = useState([]);
  const [accuracy, setAccuracy] = useState(0);
  const canvasRef = useRef(null);
  const startTimeRef = useRef(null);
  const lastMoveTimeRef = useRef(null);

  const totalTargets = 10;

  useEffect(() => {
    if (isActive) {
      generateTargets();
      startTimeRef.current = Date.now();
      lastMoveTimeRef.current = Date.now();
    }
  }, [isActive]);

  const generateTargets = () => {
    const newTargets = [];
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const rect = canvas?.getBoundingClientRect();
    const padding = 60;

    for (let i = 0; i < totalTargets; i++) {
      newTargets?.push({
        id: i,
        x: Math.random() * (rect?.width - padding * 2) + padding,
        y: Math.random() * (rect?.height - padding * 2) + padding,
        radius: 25,
        hit: false,
      });
    }

    setTargets(newTargets);
  };

  const handleMouseMove = (e) => {
    if (!isActive) return;

    const canvas = canvasRef?.current;
    if (!canvas) return;

    const rect = canvas?.getBoundingClientRect();
    const currentTime = Date.now();
    const timeSinceLastMove = lastMoveTimeRef?.current
      ? currentTime - lastMoveTimeRef?.current
      : 0;

    const mouseInfo = {
      x: e?.clientX - rect?.left,
      y: e?.clientY - rect?.top,
      timestamp: currentTime,
      timeSinceStart: currentTime - startTimeRef?.current,
      timeSinceLastMove,
      velocity:
        timeSinceLastMove > 0
          ? Math.sqrt(Math.pow(e?.movementX, 2) + Math.pow(e?.movementY, 2)) /
            timeSinceLastMove
          : 0,
    };

    setMouseData((prev) => [...prev, mouseInfo]);
    lastMoveTimeRef.current = currentTime;
  };

  const handleClick = (e) => {
    if (!isActive || currentTarget >= totalTargets) return;

    const canvas = canvasRef?.current;
    if (!canvas) return;

    const rect = canvas?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const clickY = e?.clientY - rect?.top;

    const target = targets?.[currentTarget];
    const distance = Math.sqrt(
      Math.pow(clickX - target?.x, 2) + Math.pow(clickY - target?.y, 2),
    );

    const isHit = distance <= target?.radius;

    const clickInfo = {
      targetId: target?.id,
      clickX,
      clickY,
      targetX: target?.x,
      targetY: target?.y,
      distance,
      isHit,
      timestamp: Date.now(),
      timeSinceStart: Date.now() - startTimeRef?.current,
    };

    setClickData((prev) => [...prev, clickInfo]);

    if (isHit) {
      setTargets((prev) =>
        prev?.map((t, idx) =>
          idx === currentTarget ? { ...t, hit: true } : t,
        ),
      );
      setCurrentTarget((prev) => prev + 1);

      const hits = clickData?.filter((c) => c?.isHit)?.length + 1;
      setAccuracy(Math.round((hits / (currentTarget + 1)) * 100));

      if (currentTarget + 1 === totalTargets) {
        handleExerciseComplete();
      }
    }
  };

  const handleExerciseComplete = () => {
    const exerciseData = {
      mouseData,
      clickData,
      accuracy,
      completionTime: Date.now() - startTimeRef?.current,
      totalTargets,
      successfulHits: clickData?.filter((c) => c?.isHit)?.length + 1,
      averageVelocity:
        mouseData?.length > 0
          ? mouseData?.reduce((sum, m) => sum + m?.velocity, 0) /
            mouseData?.length
          : 0,
    };

    onDataCapture(exerciseData);
    onComplete();
  };

  const handleStart = () => {
    setIsActive(true);
    setCurrentTarget(0);
    setMouseData([]);
    setClickData([]);
    setAccuracy(0);
  };

  const handleRestart = () => {
    setIsActive(false);
    setTimeout(() => handleStart(), 100);
  };

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext("2d");
    const rect = canvas?.getBoundingClientRect();
    canvas.width = rect?.width;
    canvas.height = rect?.height;

    ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

    targets?.forEach((target, index) => {
      if (index < currentTarget) {
        ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
        ctx.strokeStyle = "rgba(16, 185, 129, 0.5)";
      } else if (index === currentTarget) {
        ctx.fillStyle = "rgba(6, 182, 212, 0.2)";
        ctx.strokeStyle = "rgba(6, 182, 212, 1)";
      } else {
        ctx.fillStyle = "rgba(148, 163, 184, 0.1)";
        ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
      }

      ctx?.beginPath();
      ctx?.arc(target?.x, target?.y, target?.radius, 0, Math.PI * 2);
      ctx?.fill();
      ctx.lineWidth = 2;
      ctx?.stroke();

      if (target?.hit) {
        ctx.fillStyle = "rgba(16, 185, 129, 1)";
        ctx?.beginPath();
        ctx?.arc(target?.x, target?.y, 8, 0, Math.PI * 2);
        ctx?.fill();
      }

      if (index === currentTarget) {
        ctx.fillStyle = "rgba(241, 245, 249, 1)";
        ctx.font = "14px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx?.fillText(`${index + 1}`, target?.x, target?.y);
      }
    });
  }, [targets, currentTarget]);

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg">
            <Icon name="MousePointer2" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Mouse Movement Analysis
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground caption">
              Click targets in sequence
            </p>
          </div>
        </div>

        {isActive && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-muted-foreground caption">
                Progress
              </div>
              <div className="text-lg md:text-xl font-bold text-accent">
                {currentTarget}/{totalTargets}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground caption">
                Accuracy
              </div>
              <div className="text-lg md:text-xl font-bold text-success">
                {accuracy}%
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
                Click each target in numerical order. We'll analyze your mouse
                movement patterns, velocity, and accuracy.
              </p>
              <p className="text-xs text-muted-foreground caption">
                Estimated time: 45-60 seconds
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-background border border-border rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            className="w-full h-64 md:h-80 lg:h-96 cursor-crosshair"
            style={{ touchAction: "none" }}
          />

          {!isActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center">
                <Icon
                  name="MousePointer2"
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

        {mouseData?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-xs text-muted-foreground caption mb-1">
                Movements
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {mouseData?.length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground caption mb-1">
                Clicks
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {clickData?.length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground caption mb-1">
                Accuracy
              </div>
              <div className="text-base md:text-lg font-semibold text-success">
                {accuracy}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground caption mb-1">
                Avg Velocity
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {mouseData?.length > 0
                  ? Math.round(
                      (mouseData?.reduce((sum, m) => sum + m?.velocity, 0) /
                        mouseData?.length) *
                        100,
                    ) / 100
                  : 0}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MouseExercise;
