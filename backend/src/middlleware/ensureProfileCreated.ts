import { clerkClient, getAuth } from "@clerk/express";
import prisma from "../apis/prismaClient.js";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";
import { ErrorCode } from "../types/errorCodes.js";
import { InternalServerError, UnauthorizedError } from "../types/HttpError.js";

export const ensureProfileCreated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId: clerkUserId } = getAuth(req);
    if (!clerkUserId) {
      return next(new UnauthorizedError("User authentication required", ErrorCode.UNAUTHORIZED));
    }
    logger.info(`Authenticated User ID: ${clerkUserId}`);

    let appUser = await prisma.userProfileData.findUnique({
      where: { authUserId: clerkUserId },
    });

    if (!appUser) {
      logger.info(`User not found in DB, fetching Clerk info for ID: ${clerkUserId}`);
      const clerkUser = await clerkClient.users.getUser(clerkUserId);
      const email = clerkUser.emailAddresses?.[0]?.emailAddress || null;

      if (email) {
        // Check if a profile with this email already exists
        const existingByEmail = await prisma.userProfileData.findUnique({
          where: { email },
        });

        if (existingByEmail) {
          logger.info(`Found existing user profile by email ${email}, linking authUserId: ${clerkUserId}`);
          appUser = await prisma.userProfileData.update({
            where: { id: existingByEmail.id },
            data: { authUserId: clerkUserId },
          });
        }
      }

      if (!appUser) {
        logger.info(`Creating new user profile for authUserId: ${clerkUserId}`);
        appUser = await prisma.userProfileData.create({
          data: {
            authUserId: clerkUser.id,
            email: email,
            firstName: clerkUser.firstName || "",
            lastName: clerkUser.lastName || "",
          },
        });
        logger.info(`User created successfully with ID: ${clerkUser.id}`);
      }
    }

    res.locals.user = appUser;
    return next();
  } catch (err: any) {
    logger.error(`Error initializing user profile: ${err.stack || err.message}`);
    return next(new InternalServerError("Failed to initialize the user.", ErrorCode.INTERNAL_SERVER_ERROR));
  }
};
