/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt, { hashSync } from "bcryptjs";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });
  // if (isUserExist) {
  //   throw new AppError(httpStatus.BAD_REQUEST, "User already exist");
  // }
  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };
  const hashPass = await hashSync(
    password as string,
    Number(envVars.BCRYPT_SALT)
  );
  const user = await User.create({
    email,
    password: hashPass,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

//Update User
const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const IfUserExist = await User.findById(userId);
  if (!IfUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  // if (IfUserExist.isDeleted || IfUserExist.isActive === IsActive.BLOCKED) {
  //   throw new AppError(httpStatus.FORBIDDEN, "This user can not be updated");
  // }

  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorize");
    }
    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorize");
    }
  }
  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role == Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorize");
    }
  }
  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(envVars.BCRYPT_SALT)
    );
  }
  const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdateUser;
};

const getAllUsers = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const UserServices = {
  createUser,
  getAllUsers,
  updateUser,
};
