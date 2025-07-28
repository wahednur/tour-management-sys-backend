import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().min(2, "PORT is required"),
  DB_URI: z.string().url("DB_URI must be a valid MongoDB URL"),
  NODE_ENV: z.enum(["development", "production"], {
    errorMap: () => ({
      message: "NODE_ENV must be 'development' or 'production'",
    }),
  }),
  JWT_SECRET: z.string(),
  JWT_EXP_IN: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXP: z.string(),
  BCRYPT_SALT: z.string(),
  SUPER_ADMIN_EMAIL: z.string().email("Invalid SUPER_ADMIN_EMAIL"),
  SUPER_ADMIN_PASSWORD: z
    .string()
    .min(8, "SUPER_ADMIN_PASSWORD must be at least 8 characters"),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z
    .string()
    .url("GOOGLE_CALLBACK_URL must be a valid URL"),
  EXPRESS_SESSION_SECRET: z.string(),
  FRONTEND_URL: z.string().url("FRONTEND_URL must be a valid URL"),
  // Flattened SSL fields
  SSL_STORE_ID: z.string(),
  SSL_STORE_PASS: z.string(),
  SSL_PAYMENT_API: z.string().url(),
  SSL_VALIDATION_API: z.string().url(),
  SSL_SUCCESS_URL: z.string().url(),
  SSL_FAIL_URL: z.string().url(),
  SSL_CANCEL_URL: z.string().url(),

  //Coudinary
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Environment variable validation failed:");
  console.error(parsedEnv.error.format());
  process.exit(1);
}

const env = {
  ...parsedEnv.data,
  SSL: {
    SSL_STORE_ID: parsedEnv.data.SSL_STORE_ID,
    SSL_STORE_PASS: parsedEnv.data.SSL_STORE_PASS,
    SSL_PAYMENT_API: parsedEnv.data.SSL_PAYMENT_API,
    SSL_VALIDATION_API: parsedEnv.data.SSL_VALIDATION_API,
    SSL_SUCCESS_URL: parsedEnv.data.SSL_SUCCESS_URL,
    SSL_FAIL_URL: parsedEnv.data.SSL_FAIL_URL,
    SSL_CANCEL_URL: parsedEnv.data.SSL_CANCEL_URL,
  },
  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: parsedEnv.data.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: parsedEnv.data.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: parsedEnv.data.CLOUDINARY_API_SECRET,
  },
};

export const envVars = env;
// interface EnvConfig {
//   PORT: string;
//   DB_URI: string;
//   NODE_ENV: "development" | "production";
//   JWT_SECRET: string;
//   JWT_EXP_IN: string;
//   JWT_REFRESH_SECRET: string;
//   JWT_REFRESH_EXP: string;
//   BCRYPT_SALT: string;
//   SUPER_ADMIN_EMAIL: string;
//   SUPER_ADMIN_PASSWORD: string;
//   GOOGLE_CLIENT_ID: string;
//   GOOGLE_CLIENT_SECRET: string;
//   GOOGLE_CALLBACK_URL: string;
//   EXPRESS_SESSION_SECRET: string;
//   FRONTEND_URL: string;
// SSL:{
//   SSL_STORE_ID:string
// SSL_STORE_PASS:string
// SSL_PAYMENT_API:string
// SSL_VALIDATION_API:string
// }
// }
// const loadEnvVars = (): EnvConfig => {
//   const requiredEnvVars: string[] = [
//     "PORT",
//     "DB_URI",
//     "NODE_ENV",
//     "JWT_SECRET",
//     "JWT_EXP_IN",
//     "BCRYPT_SALT",
//     "SUPER_ADMIN_EMAIL",
//     "GOOGLE_CLIENT_ID",
//     "GOOGLE_CLIENT_SECRET",
//     "GOOGLE_CALLBACK_URL",
//     "EXPRESS_SESSION_SECRET",
//     "FRONTEND_URL",
//   ];

//   requiredEnvVars.forEach((key) => {
//     if (!process.env[key]) {
//       throw new Error(`Missing require environment variable ${key}`);
//     }
//   });
//   return {
//     PORT: process.env.PORT as string,
//     DB_URI: process.env.DB_URI as string,
//     NODE_ENV: process.env.NODE_ENV as "development" | "production",
//     JWT_SECRET: process.env.JWT_SECRET as string,
//     JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
//     JWT_REFRESH_EXP: process.env.JWT_REFRESH_EXP as string,
//     JWT_EXP_IN: process.env.JWT_EXP_IN as string,
//     BCRYPT_SALT: process.env.BCRYPT_SALT as string,
//     SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
//     SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
//     GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
//     GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
//     GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
//     EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
//     FRONTEND_URL: process.env.FRONTEND_URL as string,
//   };
// };
// export const envVars = loadEnvVars();
