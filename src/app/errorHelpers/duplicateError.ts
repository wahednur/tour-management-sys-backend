/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorResponse } from "../interfaces/error.types";

//Duplicate error
export const handlerDuplicateError = (err: any): TGenericErrorResponse => {
  const matchedArray = err.message.match(/"([^"]*)"/);
  return {
    statusCode: 400,
    message: `${matchedArray[1]} already exist`,
  };
};
