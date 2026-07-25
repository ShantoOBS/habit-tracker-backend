import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.post("/register", AuthController.registerUser)
router.post("/login", AuthController.loginUser)
router.get("/me/:userId", AuthController.getMe)

router.post("/refresh-token", AuthController.getNewToken)
router.post("/logout", AuthController.logoutUser)

router.get("/all-users",checkAuth(Role.ADMIN), AuthController.getAllUsers)
router.patch("/update-status",checkAuth(Role.ADMIN), AuthController.userStatusUpdate)

export const AuthRoutes = router;