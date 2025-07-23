import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookingRoute } from "../modules/booking/booking.routes";
import { DivisionRoutes } from "../modules/division/division.route";
import { PaymentRoutes } from "../modules/payment/payment.routes";
import { TourRoute } from "../modules/tour/tour.route";
import { UserRoutes } from "../modules/user/user.route";

export const router = Router();
const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/division",
    route: DivisionRoutes,
  },
  {
    path: "/tours",
    route: TourRoute,
  },
  {
    path: "/bookings",
    route: BookingRoute,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
