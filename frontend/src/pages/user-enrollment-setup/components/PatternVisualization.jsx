import React, { useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";

const PatternVisualization = ({ capturedData }) => {
  const typingCanvasRef = useRef(null);
  const mouseCanvasRef = useRef(null);

  const { typing, mouse, interaction } = capturedData;

  useEffect(() => {
    if (typing && typing?.length > 0 && typingCanvasRef?.current) {
      drawTypingPattern();
    }
  }, [typing]);

  useEffect(() => {
    if (mouse && mouseCanvasRef?.current) {
      drawMousePattern();
    }
  }, [mouse]);

  const drawTypingPattern = () => {
    const canvas = typingCanvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext("2d");
    const rect = canvas?.getBoundingClientRect();
    canvas.width = rect?.width;
    canvas.height = rect?.height;

    ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

    if (!typing || typing?.length === 0) return;

    const latestSample = typing?.[typing?.length - 1];
    if (
      !latestSample?.keystrokeData ||
      latestSample?.keystrokeData?.length === 0
    )
      return;

    const maxTime = Math.max(
      ...latestSample?.keystrokeData?.map((k) => k?.timeSinceStart),
    );
    const padding = 40;
    const graphWidth = canvas?.width - padding * 2;
    const graphHeight = canvas?.height - padding * 2;

    ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (graphHeight / 4) * i;
      ctx?.beginPath();
      ctx?.moveTo(padding, y);
      ctx?.lineTo(canvas?.width - padding, y);
      ctx?.stroke();
    }

    ctx.strokeStyle = "rgba(6, 182, 212, 1)";
    ctx.lineWidth = 2;
    ctx?.beginPath();

    latestSample?.keystrokeData?.forEach((keystroke, index) => {
      const x = padding + (keystroke?.timeSinceStart / maxTime) * graphWidth;
      const y =
        padding + graphHeight - (keystroke?.flightTime / 200) * graphHeight;

      if (index === 0) {
        ctx?.moveTo(x, y);
      } else {
        ctx?.lineTo(x, y);
      }
    });

    ctx?.stroke();

    ctx.fillStyle = "rgba(6, 182, 212, 0.5)";
    latestSample?.keystrokeData?.forEach((keystroke) => {
      const x = padding + (keystroke?.timeSinceStart / maxTime) * graphWidth;
      const y =
        padding + graphHeight - (keystroke?.flightTime / 200) * graphHeight;
      ctx?.beginPath();
      ctx?.arc(x, y, 3, 0, Math.PI * 2);
      ctx?.fill();
    });

    ctx.fillStyle = "rgba(241, 245, 249, 0.8)";
    ctx.font = "12px Inter";
    ctx.textAlign = "center";
    ctx?.fillText("Keystroke Timing Pattern", canvas?.width / 2, 20);
  };

  const drawMousePattern = () => {
    const canvas = mouseCanvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext("2d");
    const rect = canvas?.getBoundingClientRect();
    canvas.width = rect?.width;
    canvas.height = rect?.height;

    ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

    if (!mouse || !mouse?.mouseData || mouse?.mouseData?.length === 0) return;

    const maxX = Math.max(...mouse?.mouseData?.map((m) => m?.x));
    const maxY = Math.max(...mouse?.mouseData?.map((m) => m?.y));
    const scaleX = (canvas?.width - 40) / maxX;
    const scaleY = (canvas?.height - 40) / maxY;

    ctx.strokeStyle = "rgba(6, 182, 212, 0.3)";
    ctx.lineWidth = 2;
    ctx?.beginPath();

    mouse?.mouseData?.forEach((point, index) => {
      const x = 20 + point?.x * scaleX;
      const y = 20 + point?.y * scaleY;

      if (index === 0) {
        ctx?.moveTo(x, y);
      } else {
        ctx?.lineTo(x, y);
      }
    });

    ctx?.stroke();

    if (mouse?.clickData && mouse?.clickData?.length > 0) {
      mouse?.clickData?.forEach((click) => {
        const x = 20 + click?.clickX * scaleX;
        const y = 20 + click?.clickY * scaleY;

        ctx.fillStyle = click?.isHit
          ? "rgba(16, 185, 129, 0.5)"
          : "rgba(239, 68, 68, 0.5)";
        ctx?.beginPath();
        ctx?.arc(x, y, 6, 0, Math.PI * 2);
        ctx?.fill();

        ctx.strokeStyle = click?.isHit
          ? "rgba(16, 185, 129, 1)"
          : "rgba(239, 68, 68, 1)";
        ctx.lineWidth = 2;
        ctx?.stroke();
      });
    }

    ctx.fillStyle = "rgba(241, 245, 249, 0.8)";
    ctx.font = "12px Inter";
    ctx.textAlign = "center";
    ctx?.fillText("Mouse Movement Pattern", canvas?.width / 2, 20);
  };

  const calculateTypingMetrics = () => {
    if (!typing || typing?.length === 0) return null;

    const totalSamples = typing?.length;
    const avgAccuracy =
      typing?.reduce((sum, s) => sum + s?.accuracy, 0) / totalSamples;
    const avgSpeed =
      typing?.reduce((sum, s) => sum + s?.averageSpeed, 0) / totalSamples;
    const totalKeystrokes = typing?.reduce(
      (sum, s) => s?.keystrokeData?.length + sum,
      0,
    );

    return {
      samples: totalSamples,
      accuracy: Math.round(avgAccuracy),
      speed: Math.round(avgSpeed),
      keystrokes: totalKeystrokes,
    };
  };

  const calculateMouseMetrics = () => {
    if (!mouse) return null;

    return {
      movements: mouse?.mouseData?.length || 0,
      clicks: mouse?.clickData?.length || 0,
      accuracy: mouse?.accuracy || 0,
      avgVelocity: mouse?.averageVelocity
        ? Math.round(mouse?.averageVelocity * 100) / 100
        : 0,
    };
  };

  const calculateInteractionMetrics = () => {
    if (!interaction) return null;

    return {
      scrolls: interaction?.scrollData?.length || 0,
      clicks: interaction?.clickPatterns?.length || 0,
      hovers:
        interaction?.hoverData?.filter((h) => h?.type === "enter")?.length || 0,
      score: interaction?.interactionScore || 0,
    };
  };

  const typingMetrics = calculateTypingMetrics();
  const mouseMetrics = calculateMouseMetrics();
  const interactionMetrics = calculateInteractionMetrics();

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Keyboard" size={20} color="var(--color-accent)" />
          </div>
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Typing Patterns
          </h3>
        </div>

        <canvas
          ref={typingCanvasRef}
          className="w-full h-32 md:h-40 mb-4 bg-background rounded-lg"
        />

        {typingMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground caption mb-1">
                Samples
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {typingMetrics?.samples}
              </div>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground caption mb-1">
                Accuracy
              </div>
              <div className="text-base md:text-lg font-semibold text-success">
                {typingMetrics?.accuracy}%
              </div>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground caption mb-1">
                Avg Speed
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {typingMetrics?.speed} WPM
              </div>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground caption mb-1">
                Keystrokes
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {typingMetrics?.keystrokes}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="MousePointer2" size={20} color="var(--color-accent)" />
          </div>
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Mouse Patterns
          </h3>
        </div>

        <canvas
          ref={mouseCanvasRef}
          className="w-full h-32 md:h-40 mb-4 bg-background rounded-lg"
        />

        {mouseMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground caption mb-1">
                Movements
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {mouseMetrics?.movements}
              </div>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground caption mb-1">
                Clicks
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {mouseMetrics?.clicks}
              </div>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground caption mb-1">
                Accuracy
              </div>
              <div className="text-base md:text-lg font-semibold text-success">
                {mouseMetrics?.accuracy}%
              </div>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground caption mb-1">
                Avg Velocity
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {mouseMetrics?.avgVelocity}
              </div>
            </div>
          </div>
        )}
      </div>
      {interactionMetrics && (
        <div className="bg-card border border-border rounded-lg p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
              <Icon name="Activity" size={20} color="var(--color-accent)" />
            </div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Interaction Patterns
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground caption mb-1">
                Scrolls
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {interactionMetrics?.scrolls}
              </div>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground caption mb-1">
                Clicks
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {interactionMetrics?.clicks}
              </div>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground caption mb-1">
                Hovers
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {interactionMetrics?.hovers}
              </div>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground caption mb-1">
                Score
              </div>
              <div className="text-base md:text-lg font-semibold text-success">
                {interactionMetrics?.score}%
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon
            name="TrendingUp"
            size={18}
            color="var(--color-accent)"
            className="flex-shrink-0 mt-0.5"
          />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Pattern Confidence Building
            </h4>
            <p className="text-xs text-muted-foreground caption">
              Your behavioral patterns are being analyzed in real-time. Complete
              all exercises to establish a strong authentication baseline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternVisualization;
