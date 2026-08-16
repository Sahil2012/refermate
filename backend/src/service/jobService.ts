import { Prisma } from "@prisma/client";
import { logger } from "../utils/logger.js";

export async function handleTailoredJobs(
  tx: Prisma.TransactionClient,
  threadId: number,
  jobs: string[],
  desc: string
) {

  logger.info(`Handling tailored jobs for thread: ${threadId}`);
  for (const jobId of jobs) {
    logger.info(`Upserting job with ID: ${jobId}`);
    const job = await tx.job.upsert({
      where: { jobId },
      update: { description: desc },
      create: { jobId, description: desc },
    });
    logger.info(`Mapping job to thread: ${jobId} -> ${threadId}`);
    await tx.threadJobMapping.create({
      data: {
        threadId,
        jobId: job.id,
      },
    });
  }
}
