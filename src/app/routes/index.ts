import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { HabitRoutes } from "../modules/habit/habit.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/habits", HabitRoutes);

export const IndexRoutes = router;