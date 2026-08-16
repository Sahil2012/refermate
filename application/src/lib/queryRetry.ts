import axios from "axios";

const MAX_RETRIES = 3;
const RATE_LIMIT_MAX_RETRIES = 1;
const BASE_BACKOFF_MS = 1000;
const MAX_BACKOFF_MS = 30 * 1000;

export function isRateLimitError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 429;
}

export function rateLimitAwareRetry(failureCount: number, error: unknown): boolean {
  const maxRetries = isRateLimitError(error) ? RATE_LIMIT_MAX_RETRIES : MAX_RETRIES;
  return failureCount < maxRetries;
}

export function rateLimitAwareRetryDelay(attempt: number, error: unknown): number {
  if (isRateLimitError(error) && axios.isAxiosError(error)) {
    const retryAfterSeconds = Number(error.response?.headers["retry-after"]);
    if (Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0) {
      return retryAfterSeconds * 1000;
    }
  }
  return Math.min(BASE_BACKOFF_MS * 2 ** attempt, MAX_BACKOFF_MS);
}
