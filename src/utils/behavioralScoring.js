/**
 * Behavioral Verification Score Calculator
 * Compares current behavior against baseline profile
 * Returns verification score 0-100 (100 = perfect match)
 */

/**
 * Calculate verification score based on behavioral metrics
 * @param {Object} currentBehavior - Current behavioral signature
 * @param {Object} baselineProfile - User's baseline behavioral profile
 * @returns {Object} - { score, breakdown, riskLevel }
 */
export function calculateVerificationScore(currentBehavior, baselineProfile) {
    if (!currentBehavior || !baselineProfile) {
        return {
            score: 50,
            breakdown: {},
            riskLevel: 'unknown',
            message: 'Insufficient data for verification',
        };
    }

    const scores = {
        keystroke: 0,
        mouse: 0,
        navigation: 0,
    };

    const weights = {
        keystroke: 0.40,  // 40% weight
        mouse: 0.35,      // 35% weight
        navigation: 0.25, // 25% weight
    };

    // Calculate keystroke similarity score
    if (currentBehavior.keystroke && baselineProfile.keystroke) {
        scores.keystroke = calculateKeystrokeSimilarity(
            currentBehavior.keystroke,
            baselineProfile.keystroke
        );
    }

    // Calculate mouse similarity score
    if (currentBehavior.mouse && baselineProfile.mouse) {
        scores.mouse = calculateMouseSimilarity(
            currentBehavior.mouse,
            baselineProfile.mouse
        );
    }

    // Calculate navigation similarity score
    if (currentBehavior.navigation && baselineProfile.navigation) {
        scores.navigation = calculateNavigationSimilarity(
            currentBehavior.navigation,
            baselineProfile.navigation
        );
    }

    // Calculate weighted total score
    const totalScore = Math.round(
        scores.keystroke * weights.keystroke +
        scores.mouse * weights.mouse +
        scores.navigation * weights.navigation
    );

    // Determine risk level
    const riskLevel = getRiskLevel(totalScore);

    return {
        score: totalScore,
        breakdown: scores,
        weights: weights,
        riskLevel: riskLevel,
        message: getRiskMessage(riskLevel),
        timestamp: Date.now(),
    };
}

/**
 * Calculate keystroke pattern similarity
 */
function calculateKeystrokeSimilarity(current, baseline) {
    if (!current || !baseline) return 50;

    let score = 100;

    // Compare average dwell time
    const dwellDiff = Math.abs(current.avgDwellTime - baseline.avgDwellTime);
    const dwellThreshold = baseline.stdDwellTime * 2; // 2 standard deviations
    if (dwellDiff > dwellThreshold) {
        score -= Math.min(30, (dwellDiff / dwellThreshold) * 15);
    }

    // Compare average flight time
    const flightDiff = Math.abs(current.avgFlightTime - baseline.avgFlightTime);
    const flightThreshold = baseline.stdFlightTime * 2;
    if (flightDiff > flightThreshold) {
        score -= Math.min(30, (flightDiff / flightThreshold) * 15);
    }

    // Compare typing speed
    const speedDiff = Math.abs(current.typingSpeed - baseline.typingSpeed);
    const speedThreshold = baseline.typingSpeed * 0.3; // 30% variance allowed
    if (speedDiff > speedThreshold) {
        score -= Math.min(20, (speedDiff / speedThreshold) * 10);
    }

    return Math.max(0, Math.round(score));
}

/**
 * Calculate mouse movement similarity
 */
function calculateMouseSimilarity(current, baseline) {
    if (!current || !baseline) return 50;

    let score = 100;

    // Compare average speed
    const speedDiff = Math.abs(current.avgSpeed - baseline.avgSpeed);
    const speedThreshold = baseline.stdSpeed * 2;
    if (speedDiff > speedThreshold) {
        score -= Math.min(35, (speedDiff / speedThreshold) * 20);
    }

    // Compare click frequency
    const clickDiff = Math.abs(current.clickFrequency - baseline.clickFrequency);
    const clickThreshold = baseline.clickFrequency * 0.4; // 40% variance allowed
    if (clickDiff > clickThreshold) {
        score -= Math.min(30, (clickDiff / clickThreshold) * 15);
    }

    return Math.max(0, Math.round(score));
}

/**
 * Calculate navigation pattern similarity
 */
function calculateNavigationSimilarity(current, baseline) {
    if (!current || !baseline) return 50;

    let score = 100;

    // Compare average time per page
    const timeDiff = Math.abs(current.avgTimePerPage - baseline.avgTimePerPage);
    const timeThreshold = baseline.avgTimePerPage * 0.5; // 50% variance allowed
    if (timeDiff > timeThreshold) {
        score -= Math.min(40, (timeDiff / timeThreshold) * 20);
    }

    // Compare unique routes visited
    const routeDiff = Math.abs(current.uniqueRoutes - baseline.uniqueRoutes);
    if (routeDiff > 3) {
        score -= Math.min(20, routeDiff * 5);
    }

    return Math.max(0, Math.round(score));
}

/**
 * Determine risk level based on score
 */
function getRiskLevel(score) {
    if (score >= 90) return 'trusted';
    if (score >= 70) return 'normal';
    if (score >= 50) return 'suspicious';
    return 'anomaly';
}

/**
 * Get risk message based on level
 */
function getRiskMessage(riskLevel) {
    const messages = {
        trusted: 'User behavior matches baseline profile',
        normal: 'User behavior within acceptable range',
        suspicious: 'User behavior shows minor deviations',
        anomaly: 'User behavior significantly differs from baseline',
        unknown: 'Insufficient data for verification',
    };
    return messages[riskLevel] || messages.unknown;
}

/**
 * Create baseline profile from behavioral data
 * Used during enrollment phase
 */
export function createBaselineProfile(behavioralSignatures) {
    if (!behavioralSignatures || behavioralSignatures.length === 0) {
        return null;
    }

    // Aggregate keystroke metrics
    const keystrokeMetrics = behavioralSignatures
        .map(sig => sig.keystroke)
        .filter(k => k !== null);

    const mouseMetrics = behavioralSignatures
        .map(sig => sig.mouse)
        .filter(m => m !== null);

    const navigationMetrics = behavioralSignatures
        .map(sig => sig.navigation)
        .filter(n => n !== null);

    return {
        keystroke: keystrokeMetrics.length > 0 ? {
            avgDwellTime: average(keystrokeMetrics.map(k => k.avgDwellTime)),
            stdDwellTime: average(keystrokeMetrics.map(k => k.stdDwellTime)),
            avgFlightTime: average(keystrokeMetrics.map(k => k.avgFlightTime)),
            stdFlightTime: average(keystrokeMetrics.map(k => k.stdFlightTime)),
            typingSpeed: average(keystrokeMetrics.map(k => k.typingSpeed)),
        } : null,
        mouse: mouseMetrics.length > 0 ? {
            avgSpeed: average(mouseMetrics.map(m => m.avgSpeed)),
            stdSpeed: average(mouseMetrics.map(m => m.stdSpeed)),
            clickFrequency: average(mouseMetrics.map(m => m.clickFrequency)),
        } : null,
        navigation: navigationMetrics.length > 0 ? {
            avgTimePerPage: average(navigationMetrics.map(n => n.avgTimePerPage)),
            uniqueRoutes: Math.round(average(navigationMetrics.map(n => n.uniqueRoutes))),
        } : null,
        createdAt: Date.now(),
        sampleCount: behavioralSignatures.length,
    };
}

/**
 * Utility: Calculate average
 */
function average(arr) {
    if (!arr || arr.length === 0) return 0;
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

/**
 * Check if re-authentication is required
 */
export function shouldReAuthenticate(verificationResult, consecutiveLowScores = 0) {
    // Immediate re-auth for anomaly
    if (verificationResult.score < 50) {
        return {
            required: true,
            reason: 'Anomaly detected - behavior significantly differs from baseline',
            urgency: 'high',
        };
    }

    // Re-auth after multiple suspicious scores
    if (verificationResult.score < 70 && consecutiveLowScores >= 3) {
        return {
            required: true,
            reason: 'Multiple suspicious behavior patterns detected',
            urgency: 'medium',
        };
    }

    return {
        required: false,
        reason: null,
        urgency: 'none',
    };
}

/**
 * Generate mock baseline profile for testing
 */
export function generateMockBaselineProfile() {
    return {
        keystroke: {
            avgDwellTime: 85,
            stdDwellTime: 15,
            avgFlightTime: 120,
            stdFlightTime: 25,
            typingSpeed: 45,
        },
        mouse: {
            avgSpeed: 2.5,
            stdSpeed: 0.8,
            clickFrequency: 0.5,
        },
        navigation: {
            avgTimePerPage: 15000,
            uniqueRoutes: 5,
        },
        createdAt: Date.now() - 86400000, // 1 day ago
        sampleCount: 10,
    };
}
