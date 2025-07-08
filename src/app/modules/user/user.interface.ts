import { Types } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}

// Auth provider
/**
 * credentials (email password)
 * google authentication
 *
 */
export interface IAuthProvider {
  provider: string;
  providerId: string;
}
export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}
export interface IUser {
  name: string;
  email: string;
  password?: string;
  photo?: string;
  address?: string;
  isDeleted?: string;
  isActive?: string;
  isVerified?: string;
  phone?: IsActive;
  role: Role;
  auths: IAuthProvider[];
  bookings?: Types.ObjectId[];
  guides?: Types.ObjectId[];
}
