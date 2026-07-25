import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router()

router.post("/register", AuthController.registerUser)
router.post("/login", AuthController.loginUser)
router.get("/me/:userId", AuthController.getMe)

router.get("/all-users", AuthController.getAllUsers)
router.patch("/update-status/:userId", AuthController.userStatusUpdate)

export const AuthRoutes = router;