import axios from "axios";
import httpStatus from "http-status-codes";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { ISSLCommerz } from "./sslCommerz.interface";

const sslPaymentInit = async (payload: ISSLCommerz) => {
  try {
    const data = {
      store_id: envVars.SSL_STORE_ID,
      store_passwd: envVars.SSL_STORE_PASS,
      total_amount: payload.amount,
      currency: "BDT",
      tran_id: payload.transactionId,
      success_url: `${envVars.SSL_SUCCESS_URL}?trxId=${payload.transactionId}&amount=${payload.amount}&status=success`,
      fail_url: `${envVars.SSL_FAIL_URL}?trxId=${payload.transactionId}&amount=${payload.amount}&status=fail`,
      cancel_url: `${envVars.SSL_CANCEL_URL}?trxId=${payload.transactionId}&amount=${payload.amount}&status=cancel`,
      cus_name: payload.name,
      cus_email: payload.email,
      cus_add1: payload.address,
      cus_add2: "Sherpur",
      cus_city: "Sherpur",
      cus_state: "Mymensingh",
      cus_postcode: 2100,
      cus_country: "Bangladesh",
      cus_phone: payload.phone,
      cus_fax: "N/A",
      ship_name: "N/A",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: "N/A",
      ship_country: "N/A",
    };
    const response = await axios({
      method: "POST",
      url: envVars.SSL_PAYMENT_API,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("Payment Error", error);
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const SSLService = {
  sslPaymentInit,
};
