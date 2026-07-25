import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { HabitRoutes } from "../modules/habit/habit.route";
import { CheckInRoutes } from "../modules/checkin/checkin.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/habits", HabitRoutes);
router.use("/checkins", CheckInRoutes);

export const IndexRoutes = router;