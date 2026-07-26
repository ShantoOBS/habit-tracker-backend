import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { HabitRoutes } from "../modules/habit/habit.route.js";
import { CheckInRoutes } from "../modules/checkin/checkin.route.js";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/habits", HabitRoutes);
router.use("/checkins", CheckInRoutes);

export const IndexRoutes = router;