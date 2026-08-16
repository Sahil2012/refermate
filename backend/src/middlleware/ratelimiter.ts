import { RateLimiterRedis, RateLimiterRes } from "rate-limiter-flexible";
import { redisConnection } from "../utils/redis.js";
import { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { RateLimitExceededError } from "../types/HttpError.js";
import { ErrorCode } from "../types/errorCodes.js";
import { logger } from "../utils/logger.js";
import { rateLimitConfig, RateLimitTier } from "../config/rateLimitConfig.js";

const limitersByTier = new Map<RateLimitTier, RateLimiterRedis>();

function getLimiter(tier: RateLimitTier): RateLimiterRedis {
    const existing = limitersByTier.get(tier);
    if (existing) {
        return existing;
    }

    const { points, duration, blockDuration } = rateLimitConfig[tier];
    const limiter = new RateLimiterRedis({
        storeClient: redisConnection,
        keyPrefix: `ratelimit:${tier}`,
        points,
        duration,
        blockDuration,
    });
    limitersByTier.set(tier, limiter);
    return limiter;
}

function setRateLimitHeaders(res: Response, tier: RateLimitTier, result: RateLimiterRes) {
    res.set("RateLimit-Limit", String(rateLimitConfig[tier].points));
    res.set("RateLimit-Remaining", String(result.remainingPoints));
    res.set("RateLimit-Reset", String(Math.ceil(result.msBeforeNext / 1000)));
}

// Every rate-limited route sits behind requireAuth, so userId is always present here.
export const createRateLimiter = (tier: RateLimitTier) => {
    const limiter = getLimiter(tier);

    return async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = getAuth(req);

        try {
            const result = await limiter.consume(userId!);
            setRateLimitHeaders(res, tier, result);
            next();
        } catch (error) {
            if (error instanceof RateLimiterRes) {
                setRateLimitHeaders(res, tier, error);
                const retryAfterSeconds = Math.ceil(error.msBeforeNext / 1000);
                res.set("Retry-After", String(retryAfterSeconds));
                return next(
                    new RateLimitExceededError("Too Many Requests", ErrorCode.RATE_LIMIT_EXCEEDED, {
                        tier,
                        limit: rateLimitConfig[tier].points,
                        retryAfterSeconds,
                    })
                );
            }

            // A genuine limiter backend failure (e.g. Redis unreachable) fails open: rate
            // limiting is a protective layer, not core functionality, so an outage here
            // shouldn't take the whole API down with it. Logged loudly so it gets noticed.
            logger.error(`Rate limiter backend error for tier "${tier}", failing open`, error);
            next();
        }
    };
};
