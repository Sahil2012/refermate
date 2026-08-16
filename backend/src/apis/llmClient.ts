import { logger } from "../utils/logger.js";
import { ExternalServiceError, RateLimitExceededError } from "../types/HttpError.js";
import { ErrorCode } from "../types/errorCodes.js";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import modelConfigs from "./modelConfig.js";



const models: Map<string, BaseChatModel> = new Map();

function initModels() {

    for (const modelConfig of modelConfigs) {
        if (models.has(modelConfig.name) || !modelConfig.apiKey) continue;
        try {
            const model = modelConfig.factory();
            models.set(modelConfig.name, model);
        } catch (error: any) {
            logger.error("Error initializing LLM", error);
        }
    }
}

async function callLLM(prompt: string): Promise<string> {

    initModels();

    let exception: Error | null = null;
    for (const model of modelConfigs) {
        const llm = models.get(model.name);
        if (!llm) continue;
        try {
            const res = await llm.invoke(prompt);
            return res.content as string;
        } catch (error: any) {
            exception = error as Error;
            logger.error(`Error calling LLM`, error);
        }
    }

    if (exception?.message?.includes("429")) {
        throw new RateLimitExceededError("Rate limit exceeded");
    }

    throw new ExternalServiceError(
        `Failed to generate email content: ${exception?.message || "No LLM is available to serve the request"}`,
        ErrorCode.LLM_GENERATION_FAILED,
        { errorDetails: exception?.message }
    );
}

export default callLLM;