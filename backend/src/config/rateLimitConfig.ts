import { z } from "zod";

export type RateLimitTier =
    | "authMe"
    | "profile"
    | "threads"
    | "messages"
    | "messagesGenerate"
    | "messagesSend";

export interface RateLimitTierConfig {
    points: number;
    duration: number;
    blockDuration: number;
}

const defaultConfig: Record<RateLimitTier, RateLimitTierConfig> = {
    authMe: { points: 30, duration: 60, blockDuration: 60 },
    profile: { points: 60, duration: 60, blockDuration: 90 },
    threads: { points: 60, duration: 60, blockDuration: 90 },
    messages: { points: 60, duration: 60, blockDuration: 90 },
    messagesGenerate: { points: 10, duration: 60, blockDuration: 120 },
    messagesSend: { points: 5, duration: 60, blockDuration: 120 },
};

const tierOverrideSchema = z.object({
    points: z.number().int().positive().optional(),
    duration: z.number().int().positive().optional(),
    blockDuration: z.number().int().nonnegative().optional(),
});

const rateLimitConfigOverrideSchema = z.object({
    authMe: tierOverrideSchema.optional(),
    profile: tierOverrideSchema.optional(),
    threads: tierOverrideSchema.optional(),
    messages: tierOverrideSchema.optional(),
    messagesGenerate: tierOverrideSchema.optional(),
    messagesSend: tierOverrideSchema.optional(),
});

// Merges partial per-tier overrides from RATE_LIMIT_CONFIG onto the coded defaults above.
// Invalid JSON or an unrecognized shape fails startup rather than silently using defaults,
// since a set-but-broken override is almost certainly a mistake worth surfacing immediately.
function resolveRateLimitConfig(): Record<RateLimitTier, RateLimitTierConfig> {
    const raw = process.env.RATE_LIMIT_CONFIG;
    if (!raw) {
        return defaultConfig;
    }

    let parsedJson: unknown;
    try {
        parsedJson = JSON.parse(raw);
    } catch (error) {
        throw new Error(
            `RATE_LIMIT_CONFIG is not valid JSON: ${error instanceof Error ? error.message : String(error)}`
        );
    }

    const result = rateLimitConfigOverrideSchema.safeParse(parsedJson);
    if (!result.success) {
        throw new Error(`RATE_LIMIT_CONFIG failed validation: ${result.error.message}`);
    }

    const overrides = result.data;
    const merged = {} as Record<RateLimitTier, RateLimitTierConfig>;
    for (const tier of Object.keys(defaultConfig) as RateLimitTier[]) {
        merged[tier] = { ...defaultConfig[tier], ...overrides[tier] };
    }
    return merged;
}

export const rateLimitConfig: Record<RateLimitTier, RateLimitTierConfig> = resolveRateLimitConfig();
