let keyDownTimes = {};
let holdTimes = [];
let flightTimes = [];
let lastKeyUpTime = null;
let errorCount = 0;
let totalKeys = 0;

export function onKeyDown(e) {
  if (!keyDownTimes[e.key]) {
    keyDownTimes[e.key] = performance.now();
  }
}

export function onKeyUp(e) {
  const now = performance.now();

  if (keyDownTimes[e.key]) {
    holdTimes.push(now - keyDownTimes[e.key]);
    delete keyDownTimes[e.key];
  }

  if (lastKeyUpTime !== null) {
    flightTimes.push(now - lastKeyUpTime);
  }

  lastKeyUpTime = now;
  totalKeys++;

  if (e.key === "Backspace") errorCount++;
}

export function getKeystrokeData() {
  const avg = arr => arr.length ? arr.reduce((a,b)=>a+b,0)/arr.length : 0;

  return {
    avgHoldTime: avg(holdTimes),
    avgFlightTime: avg(flightTimes),
    typingSpeed: totalKeys / ((lastKeyUpTime || 1) / 1000),
    errorRate: totalKeys ? errorCount / totalKeys : 0,
  };
}

export function resetKeystrokeData() {
  keyDownTimes = {};
  holdTimes = [];
  flightTimes = [];
  lastKeyUpTime = null;
  errorCount = 0;
  totalKeys = 0;
}
