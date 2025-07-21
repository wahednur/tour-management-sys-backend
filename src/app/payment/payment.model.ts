import { model, Schema } from "mongoose";
import { IPaymenT, PAYMENT_STATUS } from "./payment.interface";

const paymentSchema = new Schema<IPaymenT>(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.UNPAID,
    },
    paymentGatewayData: {
      type: Schema.Types.Mixed,
    },
    invoiceUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Payment = model<IPaymenT>("Payment", paymentSchema);
