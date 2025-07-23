import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sentResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const Booking = await BookingServices.createBooking(
    req.body,
    decodedToken.userId
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Booking created successfully",
    data: Booking,
  });
});

export const BookingController = { createBooking };
