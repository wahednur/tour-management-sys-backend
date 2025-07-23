/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Payment } from "../payment/payment.model";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { SSLService } from "../sslCommerz/sslCommerz.service";
import { Tour } from "../tour/tour.model";
import { User } from "../user/user.model";
import { generateTrxId } from "./../../utils/generateTrxId";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const trxId = "WS" + generateTrxId();
  const session = await Booking.startSession();
  session.startTransaction();
  const user = await User.findById(userId);
  try {
    if (!user?.phone || !user?.address) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Please update your profile to book a tour"
      );
    }
    const tour = await Tour.findById(payload.tour).select("costForm");
    if (!tour?.costForm) {
      throw new AppError(httpStatus.BAD_REQUEST, "No tour cost found");
    }
    const amount = Number(tour.costForm) * Number(payload.guestCount);
    const booking = await Booking.create(
      [
        {
          user: userId,
          status: BOOKING_STATUS.PENDING,
          ...payload,
        },
      ],
      { session }
    );

    const payment = await Payment.create([
      {
        booking: booking[0]._id,
        status: PAYMENT_STATUS.UNPAID,
        transactionId: trxId,
        amount: amount,
      },
    ]);

    const updatedBooking = await Booking.findByIdAndUpdate(
      booking[0]._id,
      { payment: payment[0]._id },
      { new: true, runValidators: true, session }
    )
      .populate("user", "name email phone")
      .populate("tour", "title costForm")
      .populate("payment");

    const userName = (updatedBooking?.user as any).name;
    const email = (updatedBooking?.user as any).email;
    const phone = (updatedBooking?.user as any).phone;
    const address = (updatedBooking?.user as any).address;
    const sslPayload: ISSLCommerz = {
      name: userName,
      email: email,
      phone: phone,
      amount: amount,
      transactionId: trxId,
      address: address,
    };
    const sslPayment = await SSLService.sslPaymentInit(sslPayload);
    console.log(sslPayment);
    await session.commitTransaction();
    session.endSession();

    return {
      payment: sslPayment,
      booking: updatedBooking,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const BookingServices = {
  createBooking,
};
