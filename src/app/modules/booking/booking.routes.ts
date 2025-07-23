import express from "express";
import { checkAuth } from "../../middlewares/checkAtuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { BookingController } from "./booking.controller";
import { createBookingZodSchema } from "./booking.validation";
const router = express.Router();

router.post(
  "/create",
  checkAuth(...Object.values(Role)),
  validateRequest(createBookingZodSchema),
  BookingController.createBooking
);

export const BookingRoute = router;
