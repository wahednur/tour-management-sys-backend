import { Types } from "mongoose";

export enum PAYMENT_STATUS {
  PAID = "PAID",
  UNPAID = "UNPAID",
  CANCELED = "CANCELED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface IPaymenT {
  booking: Types.ObjectId;
  transactionId: string;
  amount: number;
  paymentGatewayData?: any;
  invoiceUrl?: string;

  status: PAYMENT_STATUS;
}
