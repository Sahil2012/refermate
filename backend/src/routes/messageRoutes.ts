import { Router } from "express";
import { deleteMessage, editMessage, generateMessage, getMessage, getMessageTypes, sendMessageViaGmail } from "../controller/messageController.js";

import { validate } from "../middlleware/schemaValidator.js";
import { createRateLimiter } from "../middlleware/ratelimiter.js";
import { GenerateMailSchema } from "../schema/mailSchema.js";
import { MessageRequestSchema, SendMailSchema } from "../schema/messageSchema.js";
import z from "zod";

const messageRoutes = Router();

// No blanket rate limiter at the router-mount level — every route below carries its own
// explicit tier. A route added here without one is unlimited, so add createRateLimiter(...)
// alongside it.

// NOTE: This is an LLM call also ambigious if we should have this here or not
messageRoutes.post("/", createRateLimiter("messagesGenerate"), validate({ body: GenerateMailSchema }), generateMessage);
messageRoutes.get("/types", createRateLimiter("messages"), getMessageTypes);

// NOTE: This just sends the mail to the user via gmail and updates the status of the message to sent
messageRoutes.post("/:id/send", createRateLimiter("messagesSend"), validate({ body: SendMailSchema, params: z.object({ id: z.coerce.number() }) }), sendMessageViaGmail);

messageRoutes.patch("/:id", createRateLimiter("messages"), validate({ body: MessageRequestSchema, params: z.object({ id: z.coerce.number() }) }), editMessage);
messageRoutes.get("/:id", createRateLimiter("messages"), validate({ params: z.object({ id: z.coerce.number() }) }), getMessage);
messageRoutes.delete("/:id", createRateLimiter("messages"), validate({ params: z.object({ id: z.coerce.number() }) }), deleteMessage);

export default messageRoutes;