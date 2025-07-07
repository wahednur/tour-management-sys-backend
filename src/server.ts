/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URI);
    console.log("MongoDB connection successfully");

    server = app.listen(envVars.PORT, () => {
      console.log(`Tour management system server running on ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// Unhandled rejection error
process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection detected ... Server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// uncaught rejection error
process.on("uncaughtException", (err) => {
  console.log("Unhandled rejection detected ... Server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Signal rejection error
process.on("SIGTERM", (err) => {
  console.log("SIGTERM receive detected ... Server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGINT", (err) => {
  console.log("SIGINT receive detected ... Server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject(new Error("I forgot to catch is promise"));

// throw new Error("I forgot uncaught rejection error");

/**
 * Unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */
