import crypto from "crypto";

export const generateTrxId = (length = 10): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let trxId = "";
  while (trxId.length < length) {
    const bytes = crypto.randomBytes(length);
    for (let i = 0; i < bytes.length && trxId.length < length; i++) {
      const index = bytes[i] % chars.length;
      trxId += chars[index];
    }
  }
  return trxId;
};
