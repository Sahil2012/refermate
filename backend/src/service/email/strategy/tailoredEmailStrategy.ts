import { getCandidateProfile } from "../../extractCandidateProfile.js";
import { PromptTemplate } from "@langchain/core/prompts";
import { referralEmailPrompt } from "../../../utils/prompts/referralPromptTemplate.js";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { emailSchema } from "../../../schema/schema.js";
import callLLM from "../../../apis/llmClient.js";
import { TailoredEmailRequest } from "../../../types/GenerateMailRequest.js";
import prisma from "../../../apis/prismaClient.js";
import { logger } from "../../../utils/logger.js";
import { ExternalServiceError } from "../../../types/HttpError.js";
import { ErrorCode } from "../../../types/errorCodes.js";

export const tailoredEmailStrategy = async (
  emailRequest: TailoredEmailRequest
) => {
  logger.info(`Generating tailored message for user ${emailRequest.userId} with these details ${JSON.stringify(emailRequest)}`);
  const userId = emailRequest.userId;
  const jobDescription = emailRequest.jobDescription;

  // extract user profile details using userId
  const profileDetails = await getCandidateProfile(prisma, userId || "");

  logger.info(`Profile Details: ${profileDetails}`);

  const referralPrompt = PromptTemplate.fromTemplate(referralEmailPrompt);

  const parser = StructuredOutputParser.fromZodSchema(emailSchema);

  // call the llm with formatted prompt
  const res = await callLLM(
    await referralPrompt.format({
      jobDescription: jobDescription,
      jobIds: emailRequest.jobs.join(", "),
      skills: profileDetails.skills,
      experience: profileDetails.experiences,
      education: profileDetails.education,
      userName: profileDetails.userName,
      contactName: emailRequest.contactName,
      emailSchema: parser.getFormatInstructions(),
    })
  );
  logger.info(`RAW LLM response: ${res}`);

  try {
    return await parser.parse(res);
  } catch (error: any) {
    logger.error(`Failed to parse LLM response for user ${userId}`, error);
    throw new ExternalServiceError(
      `Failed to parse generated email content: ${error.message}`,
      ErrorCode.LLM_GENERATION_FAILED,
      { userId, errorDetails: error.message, rawResponse: res }
    );
  }
};
