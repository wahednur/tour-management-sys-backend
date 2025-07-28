/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { deleteImgCloudinary } from "../config/cloudinary.config";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { handleCastError } from "../errorHelpers/CastError";
import { handlerDuplicateError } from "../errorHelpers/duplicateError";
import { handleValidationError } from "../errorHelpers/ValidationError";
import { handleZodError } from "../errorHelpers/ZodError";
import { TErrorSources } from "../interfaces/error.types";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  nect: NextFunction
) => {
  if (envVars.NODE_ENV === "development") {
    console.log(err);
  }
  // Delete single cloudinary file
  if (req.file) {
    await deleteImgCloudinary(req.file.path);
  }
  if (req.files && Array(req.files) && req.files.length) {
    const imageUrls = (req.files as Express.Multer.File[]).map(
      (file) => file.path
    );
    await Promise.all(imageUrls.map((url) => deleteImgCloudinary(url)));
  }
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
