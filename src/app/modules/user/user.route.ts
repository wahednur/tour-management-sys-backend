import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAtuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { Role } from "./user.interface";
import { createdUserZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createdUserZodSchema),
  UserControllers.createUser
);
router.get(
  "/all-user",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),

  UserControllers.getAllUsers
);
router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  UserControllers.updateUser
);

export const UserRoutes = router;
