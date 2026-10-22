export const RATE_LIMIT_MAX_FAILURES = 5;
export const RATE_LIMIT_WINDOW_MINUTES = 15;

export interface LoginAttemptRecord {
  ok: boolean;
  at: Date;
}

export interface RateLimitDecision {
  allowed: boolean;
  retryAfterMinutes: number;
}

// Pure decision logic — unit-tested without a database. Locks the
// email+IP pair after RATE_LIMIT_MAX_FAILURES failed attempts inside the
// window; the lock lifts as soon as the oldest failure ages out.
export function evaluateLoginAttempts(
  attempts: LoginAttemptRecord[],
  now: Date,
): RateLimitDecision {
  const windowMs = RATE_LIMIT_WINDOW_MINUTES * 60_000;
  const recentFailures = attempts
    .filter(
      (a) => !a.ok && now.getTime() - a.at.getTime() < windowMs,
    )
    .sort((a, b) => a.at.getTime() - b.at.getTime());

  if (recentFailures.length < RATE_LIMIT_MAX_FAILURES) {
    return { allowed: true, retryAfterMinutes: 0 };
  }

  const unlockAt =
    recentFailures[0].at.getTime() + windowMs - now.getTime();
  return {
    allowed: false,
    retryAfterMinutes: Math.max(1, Math.ceil(unlockAt / 60_000)),
  };
}
