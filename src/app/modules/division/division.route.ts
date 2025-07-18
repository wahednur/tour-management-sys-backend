import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAtuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { DivisionController } from "./division.controller";
import { createDivisionSchema } from "./division.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createDivisionSchema),
  DivisionController.createDivision
);
router.get("/", DivisionController.geAllDivision);
export const DivisionRoutes = router;
