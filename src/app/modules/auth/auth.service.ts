import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";

import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { createNetworkAccessTokenWithRefreshToken } from "../../utils/userToken";
import { IAuthProvider } from "../user/user.interface";

// const credentialsLogin = async (payload: Partial<IUser>) => {
//   const { email, password } = payload;
//   const isUserExist = await User.findOne({ email });
//   if (!isUserExist) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist");
//   }
//   const isPasswordMatched = await bcrypt.compare(
//     password as string,
//     isUserExist.password as string
//   );
//   if (!isPasswordMatched) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Invalid password");
//   }

//   const userToken = createUserToken(isUserExist);

//   const { password: pass, ...rest } = isUserExist.toObject();
//   return {
//     accessToken: userToken.accessToken,
//     refreshToken: userToken.refreshToken,
//     user: rest,
//   };
// };
const getNewAccessToken = async (refreshToken: string) => {
  return await createNetworkAccessTokenWithRefreshToken(refreshToken);
  // return {
  //   accessToken: newAccessToken,
  // };
};
const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isOldPasswordMatch = await bcrypt.compare(
    oldPassword,
    user.password as string
  );

  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password does not match");
  }

  user.password = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SALT));
  await user.save();
};
const changePassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isOldPasswordMatch = await bcrypt.compare(
    oldPassword,
    user.password as string
  );

  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password does not match");
  }

  user.password = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SALT));
  await user.save();
};
const setPassword = async (userId: string, plainPassword: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  if (
    user.password &&
    user.auths.some((providerObj) => providerObj.provider === "google")
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already set your password, now you can change your password"
    );
  }

  const credentialProvider: IAuthProvider = {
    provider: "credentials",
    providerId: user.email,
  };
  const hashPassword = await bcrypt.hash(
    plainPassword,
    Number(envVars.BCRYPT_SALT)
  );
  const auths: IAuthProvider[] = [...user.auths, credentialProvider];
  user.password = hashPassword;
  user.auths = auths;
  await user.save();
};

export const AuthServices = {
  // credentialsLogin,
  getNewAccessToken,
  resetPassword,
  changePassword,
  setPassword,
};
