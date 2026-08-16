import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import profileRouter from "./routes/profileRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import threadRoutes from "./routes/threadRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { requireAuth } from "./middlleware/requireAuth.js";
import { errorHandler, notFoundHandler } from "./middlleware/errorHandler.js";
import { createRateLimiter } from "./middlleware/ratelimiter.js";
configDotenv();

const PORT = process.env.PORT;
const app = express();

// Render's health check hits this path and expects a 2xx response.
app.get("/", (req, res) => {
  res.status(200).send("ok");
});

// Use Middlewares
app.use(clerkMiddleware({ debug: process.env.NODE_ENV === "development" }));

// TODO : update cors
app.use(cors({}));

// Mounted before the global body parsers below: the Clerk webhook route needs
// the raw request body for svix signature verification, which the global
// express.json() would otherwise consume first.
app.use("/auth", authRoutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routers
app.use("/profile", requireAuth, createRateLimiter("profile"), profileRouter);
app.use("/threads", requireAuth, createRateLimiter("threads"), threadRoutes);
app.use("/messages", requireAuth, messageRoutes);

// 404 handler for undefined routes (must be after all route definitions)
app.use(notFoundHandler);

// Global error handler (must be the last middleware)
app.use(errorHandler);

// Start the server
app.listen(PORT, (error) => {
  if (error) {
    console.log("We ran into an error", error);
  } else {
    console.log(`Running on ${PORT}`);
  }
});
