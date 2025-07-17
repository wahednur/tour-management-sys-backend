/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { handleCastError } from "../errorHelpers/CastError";
import { handlerDuplicateError } from "../errorHelpers/duplicateError";
import { handleValidationError } from "../errorHelpers/ValidationError";
import { handleZodError } from "../errorHelpers/ZodError";
import { TErrorSources } from "../interfaces/error.types";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  nect: NextFunction
) => {
  const errorSources: TErrorSources[] = [];
  let statusCode = 500;
  let message = `Something went wrong!! ${err.message} from global error`;

  //Duplication error
  if (err.code === 11000) {
    const simplifyError = handlerDuplicateError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    // Invalid object ID error
  } else if (err.name === "CastError") {
    const simplifyError = handleCastError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
  }

  // Validation Error
  else if (err.name === "ValidationError") {
    statusCode = 400;
    const simplifyError = handleValidationError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
  }
  // ZodError
  else if (err instanceof ZodError) {
    // const errorSources: any = [];
    const simplifyError = handleZodError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
