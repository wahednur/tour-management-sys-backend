import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { envVars } from "../../config/env";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sentResponse";
import { PaymentService } from "./payment.service";

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  console.log("Booking id from payment controller", bookingId);
  const result = await PaymentService.initPayment(bookingId as string);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});
const successPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await PaymentService.successPayment(
    query as Record<string, string>
  );
  if (result.success) {
    res.redirect(
      `${envVars.SSL_SUCCESS_URL}/trxId=${query.trxId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});
const failPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await PaymentService.failPayment(
    query as Record<string, string>
  );
  if (!result.success) {
    res.redirect(
      `${envVars.SSL_FAIL_URL}/trxId=${query.trxId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});
const cancelPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await PaymentService.cancelPayment(
    query as Record<string, string>
  );
  if (!result.success) {
    res.redirect(
      `${envVars.SSL_CANCEL_URL}/trxId=${query.trxId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});

export const PaymentController = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
