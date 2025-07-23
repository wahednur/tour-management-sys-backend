/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { BOOKING_STATUS } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { SSLService } from "../sslCommerz/sslCommerz.service";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";

const initPayment = async (bookingId: string) => {
  const payment = await Payment.findOne({ booking: bookingId });
  console.log("Payment obj", bookingId);
  if (!payment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Payment not found, You have not booked this tour"
    );
  }
  const booking = await Booking.findById(payment.booking);
  const userName = (booking?.user as any).name;
  const email = (booking?.user as any).email;
  const phone = (booking?.user as any).phone;
  const address = (booking?.user as any).address;
  const sslPayload: ISSLCommerz = {
    name: userName,
    email: email,
    phone: phone,
    amount: payment.amount,
    transactionId: payment.transactionId,
    address: address,
  };
  const sslPayment = await SSLService.sslPaymentInit(sslPayload);
  return {
    paymentUrl: await sslPayment.GatewayPageURL,
  };
};
const successPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.trxId },
      {
        status: PAYMENT_STATUS.PAID,
      },
      { new: true, runValidators: true, session }
    );
    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.COMPLETE },
      { new: true, runValidators: true, session }
    )
      .populate("user", "name email phone address")
      .populate("tour", "title costForm")
      .populate("payment");

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Payment successfully",
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const failPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.trxId },
      {
        status: PAYMENT_STATUS.FAILED,
      },
      { new: true, runValidators: true, session }
    );
    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.FAILED },
      { runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      success: false,
      message: "Payment Failed",
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const cancelPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.trxId },
      {
        status: PAYMENT_STATUS.CANCELED,
      },
      { runValidators: true, session }
    );
    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.CANCEL },
      { runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      success: false,
      message: "Payment successfully",
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const PaymentService = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
