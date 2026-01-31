/**
 * Behavioral Biometrics Data Collection Service
 * Tracks user behavior patterns for continuous authentication
 */

class BehavioralBiometricsCollector {
    constructor() {
        this.keystrokeData = [];
        this.mouseData = [];
        this.navigationData = [];
        this.sessionStartTime = Date.now();
        this.isTracking = false;
    }

    // Initialize tracking
    startTracking() {
        if (this.isTracking) return;

        this.isTracking = true;
        this.sessionStartTime = Date.now();

        // Attach event listeners
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('click', this.handleClick);
        document.addEventListener('scroll', this.handleScroll);

        console.log('[Behavioral Biometrics] Tracking started');
    }

    // Stop tracking
    stopTracking() {
        if (!this.isTracking) return;

        this.isTracking = false;

        // Remove event listeners
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('click', this.handleClick);
        document.removeEventListener('scroll', this.handleScroll);

        console.log('[Behavioral Biometrics] Tracking stopped');
    }

    // Keystroke tracking
    handleKeyDown = (event) => {
        const timestamp = Date.now();
        const key = event.key;

        // Store key press data
        this.keystrokeData.push({
            type: 'keydown',
            key: key,
            timestamp: timestamp,
            keyCode: event.keyCode,
        });

        // Keep only last 100 keystrokes
        if (this.keystrokeData.length > 100) {
            this.keystrokeData.shift();
        }
    };

    handleKeyUp = (event) => {
        const timestamp = Date.now();
        const key = event.key;

        // Find matching keydown event
        const keydownIndex = this.keystrokeData.findIndex(
            (item) => item.type === 'keydown' && item.key === key && !item.duration
        );

        if (keydownIndex !== -1) {
            // Calculate dwell time (how long key was held)
            const dwellTime = timestamp - this.keystrokeData[keydownIndex].timestamp;
            this.keystrokeData[keydownIndex].duration = dwellTime;

            // Calculate flight time (time between key presses)
            if (keydownIndex > 0) {
                const previousKeydown = this.keystrokeData[keydownIndex - 1];
                const flightTime = this.keystrokeData[keydownIndex].timestamp - previousKeydown.timestamp;
                this.keystrokeData[keydownIndex].flightTime = flightTime;
            }
        }
    };

    // Mouse tracking
    handleMouseMove = (event) => {
        const timestamp = Date.now();

        // Sample mouse position (throttle to avoid too much data)
        if (this.mouseData.length === 0 || timestamp - this.mouseData[this.mouseData.length - 1].timestamp > 100) {
            this.mouseData.push({
                type: 'move',
                x: event.clientX,
                y: event.clientY,
                timestamp: timestamp,
            });

            // Keep only last 50 mouse movements
            if (this.mouseData.length > 50) {
                this.mouseData.shift();
            }
        }
    };

    handleClick = (event) => {
        const timestamp = Date.now();

        this.mouseData.push({
            type: 'click',
            x: event.clientX,
            y: event.clientY,
            button: event.button,
            timestamp: timestamp,
        });

        // Keep only last 50 mouse events
        if (this.mouseData.length > 50) {
            this.mouseData.shift();
        }
    };

    handleScroll = (event) => {
        const timestamp = Date.now();

        // Throttle scroll events
        if (this.mouseData.length === 0 || timestamp - this.mouseData[this.mouseData.length - 1].timestamp > 200) {
            this.mouseData.push({
                type: 'scroll',
                scrollY: window.scrollY,
                timestamp: timestamp,
            });
        }
    };

    // Navigation tracking
    trackNavigation(route) {
        const timestamp = Date.now();

        this.navigationData.push({
            route: route,
            timestamp: timestamp,
        });

        // Keep only last 20 navigation events
        if (this.navigationData.length > 20) {
            this.navigationData.shift();
        }
    }

    // Calculate behavioral signature
    calculateBehavioralSignature() {
        const signature = {
            keystroke: this.getKeystrokeMetrics(),
            mouse: this.getMouseMetrics(),
            navigation: this.getNavigationMetrics(),
            sessionDuration: Date.now() - this.sessionStartTime,
            timestamp: Date.now(),
        };

        return signature;
    }

    // Keystroke metrics
    getKeystrokeMetrics() {
        if (this.keystrokeData.length < 5) {
            return null;
        }

        const dwellTimes = this.keystrokeData
            .filter(k => k.duration)
            .map(k => k.duration);

        const flightTimes = this.keystrokeData
            .filter(k => k.flightTime)
            .map(k => k.flightTime);

        return {
            avgDwellTime: this.average(dwellTimes),
            stdDwellTime: this.standardDeviation(dwellTimes),
            avgFlightTime: this.average(flightTimes),
            stdFlightTime: this.standardDeviation(flightTimes),
            totalKeystrokes: this.keystrokeData.length,
            typingSpeed: this.calculateTypingSpeed(),
        };
    }

    // Mouse metrics
    getMouseMetrics() {
        if (this.mouseData.length < 5) {
            return null;
        }

        const movements = this.mouseData.filter(m => m.type === 'move');
        const clicks = this.mouseData.filter(m => m.type === 'click');

        const speeds = [];
        for (let i = 1; i < movements.length; i++) {
            const dx = movements[i].x - movements[i - 1].x;
            const dy = movements[i].y - movements[i - 1].y;
            const dt = movements[i].timestamp - movements[i - 1].timestamp;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const speed = distance / (dt || 1);
            speeds.push(speed);
        }

        return {
            avgSpeed: this.average(speeds),
            stdSpeed: this.standardDeviation(speeds),
            totalMovements: movements.length,
            totalClicks: clicks.length,
            clickFrequency: clicks.length / ((Date.now() - this.sessionStartTime) / 1000),
        };
    }

    // Navigation metrics
    getNavigationMetrics() {
        if (this.navigationData.length < 2) {
            return null;
        }

        const timeBetweenPages = [];
        for (let i = 1; i < this.navigationData.length; i++) {
            const timeDiff = this.navigationData[i].timestamp - this.navigationData[i - 1].timestamp;
            timeBetweenPages.push(timeDiff);
        }

        return {
            totalPages: this.navigationData.length,
            avgTimePerPage: this.average(timeBetweenPages),
            uniqueRoutes: new Set(this.navigationData.map(n => n.route)).size,
        };
    }

    // Calculate typing speed (words per minute)
    calculateTypingSpeed() {
        if (this.keystrokeData.length < 5) return 0;

        const timeSpan = (Date.now() - this.sessionStartTime) / 1000 / 60; // minutes
        const words = this.keystrokeData.length / 5; // approximate words (5 chars per word)
        return words / timeSpan;
    }

    // Utility: Calculate average
    average(arr) {
        if (!arr || arr.length === 0) return 0;
        return arr.reduce((sum, val) => sum + val, 0) / arr.length;
    }

    // Utility: Calculate standard deviation
    standardDeviation(arr) {
        if (!arr || arr.length === 0) return 0;
        const avg = this.average(arr);
        const squareDiffs = arr.map(value => Math.pow(value - avg, 2));
        const avgSquareDiff = this.average(squareDiffs);
        return Math.sqrt(avgSquareDiff);
    }

    // Clear all data
    clearData() {
        this.keystrokeData = [];
        this.mouseData = [];
        this.navigationData = [];
    }

    // Get current data snapshot
    getDataSnapshot() {
        return {
            keystroke: [...this.keystrokeData],
            mouse: [...this.mouseData],
            navigation: [...this.navigationData],
        };
    }
}

// Export singleton instance
const behavioralCollector = new BehavioralBiometricsCollector();
export default behavioralCollector;
