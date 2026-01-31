import React, { useState, useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const TypingExercise = ({ onComplete, onDataCapture }) => {
  const [currentSample, setCurrentSample] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [keystrokeData, setKeystrokeData] = useState([]);
  const [accuracy, setAccuracy] = useState(0);
  const inputRef = useRef(null);
  const startTimeRef = useRef(null);
  const lastKeyTimeRef = useRef(null);

  const samples = [
    "The quick brown fox jumps over the lazy dog near the riverbank.",
    "Behavioral biometrics analyze unique patterns in user interactions.",
    "Continuous authentication provides seamless security without friction.",
    "Machine learning algorithms detect anomalies in typing rhythms.",
    "Advanced security systems protect sensitive data from unauthorized access.",
  ];

  const currentText = samples?.[currentSample];

  useEffect(() => {
    if (isActive && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isActive]);

  useEffect(() => {
    if (typedText?.length > 0) {
      const correctChars = typedText
        ?.split("")
        ?.filter((char, index) => char === currentText?.[index])?.length;
      setAccuracy(Math.round((correctChars / typedText?.length) * 100));
    }
  }, [typedText, currentText]);

  const handleStart = () => {
    setIsActive(true);
    setTypedText("");
    setKeystrokeData([]);
    setAccuracy(0);
    startTimeRef.current = Date.now();
    lastKeyTimeRef.current = Date.now();
  };

  const handleKeyDown = (e) => {
    if (!isActive) return;

    const currentTime = Date.now();
    const timeSinceStart = currentTime - startTimeRef?.current;
    const timeSinceLastKey = lastKeyTimeRef?.current
      ? currentTime - lastKeyTimeRef?.current
      : 0;

    const keystrokeInfo = {
      key: e?.key,
      timestamp: currentTime,
      timeSinceStart,
      dwellTime: 0,
      flightTime: timeSinceLastKey,
      pressure: e?.key?.length === 1 ? Math.random() * 0.3 + 0.7 : 0,
    };

    setKeystrokeData((prev) => [...prev, keystrokeInfo]);
    lastKeyTimeRef.current = currentTime;
  };

  const handleChange = (e) => {
    if (!isActive) return;
    setTypedText(e?.target?.value);

    if (e?.target?.value === currentText) {
      handleSampleComplete();
    }
  };

  const handleSampleComplete = () => {
    const sampleData = {
      sampleIndex: currentSample,
      text: currentText,
      typedText,
      keystrokeData,
      accuracy,
      completionTime: Date.now() - startTimeRef?.current,
      averageSpeed:
        keystrokeData?.length > 0
          ? (keystrokeData?.length /
              ((Date.now() - startTimeRef?.current) / 1000)) *
            60
          : 0,
    };

    onDataCapture(sampleData);

    if (currentSample < samples?.length - 1) {
      setCurrentSample((prev) => prev + 1);
      setTypedText("");
      setIsActive(false);
      setKeystrokeData([]);
      setAccuracy(0);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    if (currentSample < samples?.length - 1) {
      setCurrentSample((prev) => prev + 1);
      setTypedText("");
      setIsActive(false);
      setKeystrokeData([]);
      setAccuracy(0);
    }
  };

  const renderTextComparison = () => {
    return (
      <div className="relative p-4 md:p-6 bg-muted/30 rounded-lg font-mono text-sm md:text-base">
        <div className="mb-4">
          {currentText?.split("")?.map((char, index) => {
            const typedChar = typedText?.[index];
            const isCorrect = typedChar === char;
            const isTyped = index < typedText?.length;

            return (
              <span
                key={index}
                className={`
                  ${isTyped ? (isCorrect ? "text-success bg-success/10" : "text-error bg-error/10") : "text-muted-foreground"}
                  ${index === typedText?.length ? "border-b-2 border-accent animate-pulse" : ""}
                `}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg">
            <Icon name="Keyboard" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Typing Pattern Analysis
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground caption">
              Sample {currentSample + 1} of {samples?.length}
            </p>
          </div>
        </div>

        {isActive && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-muted-foreground caption">
                Accuracy
              </div>
              <div className="text-lg md:text-xl font-bold text-accent">
                {accuracy}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground caption">Keys</div>
              <div className="text-lg md:text-xl font-bold text-foreground">
                {keystrokeData?.length}
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
                Type the text below exactly as shown. We'll analyze your typing
                rhythm, speed, and patterns.
              </p>
              <p className="text-xs text-muted-foreground caption">
                Estimated time: 30-45 seconds per sample
              </p>
            </div>
          </div>
        </div>

        {renderTextComparison()}

        <div>
          <textarea
            ref={inputRef}
            value={typedText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!isActive}
            placeholder={
              isActive
                ? "Start typing here..."
                : "Click 'Start Exercise' to begin"
            }
            className="w-full h-24 md:h-32 p-4 bg-background border border-border rounded-lg text-sm md:text-base text-foreground font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
          />
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
              onClick={handleStart}
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
            onClick={handleSkip}
            disabled={currentSample === samples?.length - 1}
            fullWidth
            className="sm:flex-1"
          >
            Skip Sample
          </Button>
        </div>

        {keystrokeData?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-xs text-muted-foreground caption mb-1">
                Avg Speed
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {Math.round(
                  (keystrokeData?.length /
                    ((Date.now() - startTimeRef?.current) / 1000)) *
                    60,
                )}{" "}
                WPM
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground caption mb-1">
                Keys Pressed
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {keystrokeData?.length}
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
                Time Elapsed
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground">
                {Math.round((Date.now() - startTimeRef?.current) / 1000)}s
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingExercise;
