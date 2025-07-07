import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URI: string;
  NODE_ENV: "development" | "production";
}
const loadEnvVars = (): EnvConfig => {
  const requiredEnvVars: string[] = ["PORT", "DB_URI", "NODE_ENV"];

  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DB_URI: process.env.DB_URI as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  };
};
export const envVars = loadEnvVars();
